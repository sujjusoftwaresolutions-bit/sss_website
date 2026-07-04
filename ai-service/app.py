from flask import Flask, request, jsonify
# import cv2
# from ultralytics import YOLO

app = Flask(__name__)

# TODO: Load actual YOLOv8 model here
# model = YOLO('best.pt')

@app.route('/ai/validate', methods=['POST'])
def validate_image():
    if 'image' not in request.files:
        return jsonify({"success": False, "message": "No image uploaded"}), 400
    
    file = request.files['image']
    
    # Placeholder: In the future, pass `file` to the YOLOv8 model
    # results = model(file)
    
    # Mock Response mimicking expected model output
    return jsonify({
        "success": True,
        "predictedClass": "Garbage",
        "confidence": 0.96,
        "matched": True
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)
