import numpy as np
from flask import Flask, request, jsonify, render_template, Response
import cv2
import keras
import time

parking_slots = [(48,110), (44,153), (43,201), (40,249), (40,299), (41,344), (40,392), (45,439), (42,483), (45,532), (46,582), (47,628),
    (164,104), (163,157), (166,202), (170,247), (168,299), (168,342), (165,388), (165,436), (171,485), (167,536),  (168,578), (171,626),
    (389,104), (390,149), (391,199), (391,245), (391,292), (392,340), (391,389), (392,434), (396,530), (395,577), (394,626), 
    (512,100), (511,150), (512,196), (509,245), (507,293), (511,335), (512,388), (508,434), (512,533), (516,579), (513,626),
    (742,99), (742,145), (742,190), (742,240), (737,293), (742,339), (742,381), (742,433), (743,479), (744,524), (744,573), (746,626), 
    (909,148), (909,196), (909,243), (909,292), (909,343), (909,386), (909,438), (909,483), (909,531), (909,576), (909,624)]
rect_width, rect_height = 92, 30
video_path = "video/CarPark.mp4"


global price, prevFreeslots
color = (0,0,255)
thick = 1
threshold = 30
last_call_time = -1
prevFreeslots = 0
a = 40
b = 50

price = 0

app = Flask(__name__)
model = keras.models.load_model("Saved_model/model2")

cap = cv2.VideoCapture(video_path)
parking_values = [0] * len(parking_slots)


@app.route("/")
def index():
    global price, prevFreeslots
    response = render_template(
        "cars.html"
    )
    return response

@app.route("/update", methods = ['GET'])
def update():
    global price, prevFreeslots
    indices = [i + 1 for i, x in enumerate(parking_values) if x == 0]
    return jsonify(price = round(price, 2), freeslots = prevFreeslots, slots = indices)

def convert_grayscale(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contour_image = frame.copy()
    contour_image[:] = 0 

    contour_image = cv2.drawContours(contour_image, contours, -1, (255, 255, 255), thickness=2)
    return contour_image

def main():
    global last_call_time
    global prevFreeslots, price

    frame_width = int(cap.get(3))
    frame_height = int(cap.get(4))

    size = (frame_width, frame_height)
    # result = cv2.VideoWriter(
    #         "final.mp4", cv2.VideoWriter_fourcc(*"MP4V"), 30, size
    #     )

    key = True
    while True:
        ret, frame = cap.read()

        if not ret:
            cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
            ret, frame = cap.read()
            # result.release()
            # break

        if len(parking_slots) > len(parking_values): 
            parking_values.append(0)

        # cv2.imwrite("image.jpg", frame)
        # frame = Image.open("image.jpg")

        grayscale_frame = convert_grayscale(frame)
        # out_image = mark_slots(frame, grayscale_frame, key)

        current_time = time.time()

        freeslots=0
        current_time = time.time()
        if rect_height:
            last_call_time = current_time
            i = 0
            for x, y in parking_slots:
                x1=x
                x2=x+rect_width
                y1=y
                y2=y+rect_height
                start_point, stop_point = (x1,y1), (x2, y2)

                crop = grayscale_frame[y1:y2, x1:x2]
                crop_frame = frame[y1:y2, x1:x2]
                gray_crop = cv2.cvtColor(crop, cv2.COLOR_BGR2GRAY)

                count = cv2.countNonZero(gray_crop)

                resized_crop = cv2.resize(crop_frame, (128, 128))
                resized_crop = resized_crop.reshape(1,resized_crop.shape[0],resized_crop.shape[1],3)

                if count < 200 and not np.argmax(model.predict([resized_crop], verbose = 0)):
                    freeslots = freeslots+1
                    color, thick = [(0,255,0), 2]
                    parking_values[i] = 0
                    # cv2.imwrite(f"Data/Free/{i + 1}.jpg", crop_frame)
                    # i += 1
                else:
                    color, thick = [(0,0,255), 2]
                    parking_values[i] = 1
                    # cv2.imwrite(f"Data/Parked/{j + 1}.jpg", crop_frame)
                    # j += 1
                i += 1

                if(count < 200):
                    j = 0
                    ret, frame = cap.read()
                    # if not ret: cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                    if not ret: 
                        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                        # result.release()
                        # return
                    ret, frame = cap.read()
                    if not ret: 
                        # result.release()
                        # return
                        cap.set(cv2.CAP_PROP_POS_FRAMES, 0)
                        ret, frame = cap.read()

                    for x, y in parking_slots:
                        x1=x
                        x2=x+rect_width
                        y1=y
                        y2=y+rect_height
                        start_point, stop_point = (x1,y1), (x2, y2)

                        if parking_values[j]:
                            color, thick = [(0,0,255), 2]
                        else:
                            color, thick = [(0,255,0), 2]
                        j += 1

                        frame = cv2.rectangle(frame, start_point, stop_point, color, thick)
                    
                    frame = cv2.putText(frame, "Free Slots:" + str(prevFreeslots), (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (200, 255, 255), 2)
                    x = 1 - prevFreeslots/len(parking_slots)
                    price = (b * x) + a
                    frame = cv2.putText(frame, "Ticket Price:" + str(round(price,2)), (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (200, 255, 255), 2)

                    # result.write(frame)
                    _, buffer = cv2.imencode(".jpg", frame)
                    frame_temp = buffer.tobytes()

                    yield (
                        b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame_temp + b"\r\n"
                    )
                    cv2.waitKey(1)

        if key:
            frame = cv2.putText(frame, "Free Slots:" + str(freeslots), (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (200, 255, 255), 2)
            x = 1 - freeslots/len(parking_slots)

            price = (b * x) + a
            frame = cv2.putText(frame, "Ticket Price:" + str(round(price, 2)), (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (200, 255, 255), 2)
            prevFreeslots = freeslots

        k = cv2.waitKey(8)
        if k & 0xFF == ord('q'):
            break
        if k & 0xFF == ord('a'):
            key = False

        # result.write(frame)
        _, buffer = cv2.imencode(".jpg", frame)
        frame = buffer.tobytes()

        yield (
            b"--frame\r\n" b"Content-Type: image/jpeg\r\n\r\n" + frame + b"\r\n"
        )

@app.route("/results", methods=["POST"])
def results():  
    return True

@app.route("/video_feed")
def video_feed():
    """Video streaming route. Put this in the src attribute of an img tag."""
    return Response(main(), mimetype="multipart/x-mixed-replace; boundary=frame")

if __name__ == "__main__":
    app.run(debug=True)
