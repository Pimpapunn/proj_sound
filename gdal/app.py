from osgeo import gdal, ogr
import os
from flask import Flask, jsonify, request
import json
import subprocess

app = Flask(__name__)

try:
    # Database connection details
    dbServer = "postgis"
    dbName = "geodb"
    dbUser = "postgres"
    dbPass = "1234"

    @app.route('/')
    def hello_world():
        return jsonify(message='Hello, from python')

    @app.route('/noyna', methods=['POST'])
    def post():
        data = request.json["name"]
        return jsonify(message='Hello, ' + data), 200

    @app.route('/interpolation', methods=['POST'])
    def getisoline():
        fld = request.json["name"]
        interval = request.json["interval"]
        isopath = "./json"
        tiffpath = "./tiff"
        shppath = "./shp"
        sql = f'''SELECT geom, stationname, lat, lng, AVG(sound_level) AS savg \
                    FROM public.v_parks_sound \
                    WHERE datetime >= '2024-07-18 01:00:00' \
                    AND datetime < '2024-07-18 02:00:00' \
                    GROUP BY geom, stationname, lat, lng'''
        print(sql)
        stat_shp = f'''stat_shp.shp'''
        cmd = f'''ogr2ogr -overwrite -f "ESRI Shapefile" {stat_shp} PG:"host={dbServer} user={dbUser} dbname={dbName} password={dbPass}" -sql "{sql}"'''
        os.system(cmd)
        print("shp created")

        output_raster = f'idw.tif'
        cmd = f'''gdal_grid -a invdist:power=2:max_points=15:min_points=3 \
        -outsize 100 100 \
        -of GTiff \
        -zfield "{fld}" \
        {stat_shp} {output_raster}'''
        os.system(cmd)
        print("idw created")

        output_geojson_filename = f'isoline.geojson'
        cmd = ['gdal_contour', '-a', fld, '-i', str(interval), output_raster, output_geojson_filename]

        return jsonify(status='success!!'), 200
        # try:
        #     subprocess.check_call(cmd)
        #     with open(output_geojson_filename, 'r') as geojson_file:
        #         geojson_data = json.load(geojson_file)
        #     return jsonify(geojson_data), 200
        # except subprocess.CalledProcessError:
        #     return jsonify(error='Error running gdal_contour'), 500
        # except FileNotFoundError:
        #     return jsonify(error='GeoJSON file not found'), 404

except ImportError:
    print("GDAL's Python bindings are not installed!")

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3500, debug=True)
