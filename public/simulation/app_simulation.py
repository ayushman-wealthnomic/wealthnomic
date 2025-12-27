from flask import Flask, render_template, jsonify, request, send_from_directory
import subprocess
import os
import json
import sys

app = Flask(__name__, static_folder='.', template_folder='.')

@app.route('/')
def index():
    return render_template('simulation_dashboard.html')

@app.route('/run_simulation', methods=['POST'])
def run_sim():
    data = request.json
    start_date = data.get('start_date', '2024-01-01')
    do_download = data.get('download', False)
    
    cmd = [sys.executable, 'simulation_backend.py', '--start', start_date]
    if do_download:
        cmd.append('--download')
        
    try:
        # Run synchronous for now (could be async in real app)
        subprocess.check_call(cmd)
        return jsonify({"status": "success", "message": "Simulation completed"})
    except subprocess.CalledProcessError as e:
        return jsonify({"status": "error", "message": str(e)}), 500

@app.route('/data')
def get_data():
    if os.path.exists('simulation_data.json'):
        with open('simulation_data.json', 'r') as f:
            data = json.load(f)
        return jsonify(data)
    else:
        return jsonify({"error": "No data found. Run simulation first."}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)
