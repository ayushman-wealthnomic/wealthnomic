#!/bin/bash

# Check if Flask is installed
python3 -c "import flask" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "⚠️  Flask not found. Installing requirements..."
    pip install -r requirements_simulation.txt
fi

echo "🚀 Starting Simulation Dashboard..."
echo "👉 Open http://127.0.0.1:5001 in your browser"

python3 app_simulation.py
