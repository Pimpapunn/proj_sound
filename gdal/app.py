from osgeo import gdal, ogr
import os
from flask import Flask, jsonify, request
from flask_cors import CORS

import json
import subprocess

app = Flask(__name__)
CORS(app)

try:
    # Database connection details
    dbServer = "postgis"
    dbName = "geodb"
    dbUser = "postgres"
    dbPass = "1234"

    @app.route('/sss/bds/noyna', methods=['POST'])
    def post():
        data = request.json["name"]
        return jsonify(message='Hello, ' + data), 200

    @app.route('/sss/bds/interpolation', methods=['POST'])
    def getisoline():
        dayName = request.json["dayName"]
        timeStart = request.json["timeStart"]
        timeEnd = request.json["timeEnd"]
        
        print(dayName, timeStart, timeEnd)
        fld = 'savg'
        tiffpath = "./tiff"
        shppath = "./shp"
        sql = f'''SELECT geom, stationname, lat, lng, AVG(sound_level) AS savg \
                    FROM public.b_cmu_sound \
                    WHERE LOWER(TO_CHAR(dt7, 'FMDay')) = '{dayName}'\
                    AND TO_CHAR(dt7, 'HH24:MI') BETWEEN '{timeStart}:00' AND '{timeEnd}:00' \
                    GROUP BY geom, stationname, lat, lng'''
        print(sql)
        stat_shp = os.path.join(os.getcwd(), 'output', 'stat_shp.shp') 
        # stat_shp = f'''stat_shp.shp'''
        cmd = f'''ogr2ogr -overwrite -f "ESRI Shapefile" {stat_shp} PG:"host={dbServer} user={dbUser} dbname={dbName} password={dbPass}" -sql "{sql}"'''
        os.system(cmd)
        print("shp created")

        # output_raster = f'output/idw_{dayName}_{timeStart}{timeEnd}.tif'
        output_raster = os.path.join(os.getcwd(), 'output', f'idw_{dayName}_{timeStart}{timeEnd}.tif')
        cmd = f'''gdal_grid -a invdist:power=2:max_points=15:min_points=3 \
        -outsize 100 100 \
        -of GTiff \
        -zfield "{fld}" \
        {stat_shp} {output_raster}'''
        os.system(cmd)
        print("idw created")

        interval = 40
        output_geojson_filename = f'output/idw_{dayName}_{timeStart}{timeEnd}.geojson'
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
    app.run(host="0.0.0.0", port=5400, debug=True)
    

