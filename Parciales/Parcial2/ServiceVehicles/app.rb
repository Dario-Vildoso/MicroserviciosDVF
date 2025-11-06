require "sinatra"
require "sinatra/json"
require "sinatra/cross_origin"
require "json"
require "jwt"
require_relative "./config/database"

enable :cross_origin
set :bind, "0.0.0.0"
set :port, 4567

helpers do
  def authenticate!
    auth_header = request.env["HTTP_AUTHORIZATION"]
    halt 401, json(error: "Token requerido") unless auth_header&.start_with?("Bearer ")
    token = auth_header.split(" ").last
    begin
      JWT.decode(token, "sup6546ersecreto", true, algorithm: "HS256")
    rescue JWT::DecodeError
      halt 401, json(error: "Token inválido")
    end
  end
end


VEHICLES = DB_CLIENT[:vehicles]

get "/vehiculos" do
  authenticate!
  content_type :json
  vehicles = VEHICLES.find.map { |e| e }.to_a
  json vehicles
end

get "/vehiculos/:id" do
  authenticate!
  content_type :json
  require "bson"
  vehicle = VEHICLES.find(_id: BSON::ObjectId(params[:id])).first
  halt 404, json(error: "Vehiculo no encontrado") unless vehicle
  json vehicle
end

post "/vehiculos" do
  authenticate!
  content_type :json
  data = JSON.parse(request.body.read)
  nuevo = {
    placa: data["placa"],
    tipo: data["tipo"],
    capacidad: data["capacidad"],
    estado: data["estado"]
  }
  result = VEHICLES.insert_one(nuevo)
  status 201
  json({ id: result.inserted_id, **nuevo })
end

put "/vehiculos/:id" do
  authenticate!
  content_type :json
  data = JSON.parse(request.body.read)
  result = VEHICLES.update_one(
    { _id: BSON::ObjectId(params[:id]) },
    { "$set" => data }
  )
  halt 404, json(error: "Vehiculo no encontrado") if result.modified_count == 0
  json({ mensaje: "Vehiculo actualizado" })
end

delete "/vehiculos/:id" do
  authenticate!
  content_type :json
  result = VEHICLES.delete_one(_id: BSON::ObjectId(params[:id]))
  halt 404, json(error: "Vehiculo no encontrado") if result.deleted_count == 0
  json({ mensaje: "Vehiculo eliminado" })
end
