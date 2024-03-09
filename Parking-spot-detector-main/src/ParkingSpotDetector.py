import cv2
import numpy as np
import time
import keras

parking_slots = []
rect_width, rect_height = 0, 0

##CarPark
# parking_slots = [(48,110), (44,153), (43,201), (40,249), (40,299), (41,344), (40,392), (45,439), (42,483), (45,532), (46,582), (47,628),
#     (171,626), (168,578), (167,536), (171,485), (165,436), (165,388), (168,342), (168,299), (170,247), (166,202), (163,157), (164,104), 
#     (389,104), (390,149), (391,199), (391,245), (391,292), (392,340), (391,389), (392,434), (396,530), (395,577), (394,626), 
#     (513,626), (516,579), (512,533), (508,434), (512,388), (511,335), (507,293), (509,245), (512,196), (511,150), (512,100), 
#     (742,99), (742,145), (742,190), (742,240), (737,293), (742,339), (742,381), (742,433), (743,479), (744,524), (744,573), (746,626), 
#     (909,624), (909,576), (909,531), (909,483), (909,438), (909,386), (909,343), (909,292), (909,243), (909,196), (909,148)]
# rect_width, rect_height = 92, 30
# video_path = "video/CarPark.mp4"


##parking_vid_2
# parking_slots = [(24, 6), (52, 7), (80, 7), (108, 8), (138, 10), (167, 6), (195, 8), (230, 7), (272, 9), (317, 8), (360, 7), (400, 9), (428, 8), (460, 10), (489, 11), (532, 13), (22, 68), (49, 71), (79, 73), (110, 74), (138, 74), (167, 73), (196, 73), (226, 73), (274, 76), (310, 73), (360, 73), (401, 73), (428, 72), (458, 72), (487, 75), (519, 73), (548, 73), (25, 210), (53, 212), (80, 211), (112, 211), (138, 208), (168, 211), (196, 213), (224, 210), (253, 211), (283, 212), (314, 213), (342, 213), (371, 216), (399, 219), (428, 210), (458, 210), (489, 212), (524, 211), (568, 214), (25, 273), (51, 271), (82, 273), (110, 276), (138, 271), (166, 273), (197, 272), (224, 272), (254, 271), (286, 273), (311, 274), (339, 274), (370, 274), (397, 274), (425, 274), (458, 276), (487, 276), (519, 274), (564, 274)]
# rect_width, rect_height = 21, 52
video_path = "video/parking_crop.mp4"

cap = cv2.VideoCapture(video_path)
parking_values = [0] * len(parking_slots)

color = (0,0,255)
thick = 1
threshold = 30
last_call_time = -1
prevFreeslots = 0
a = 40
b = 50
model = keras.models.load_model("Saved_model/model2")

def click_event(event, x, y, flags, params):
    if event == cv2.EVENT_LBUTTONDOWN:
        print(f'({x},{y})')
        parking_slots.append((x, y))

def convert_grayscale(frame):
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    _, binary = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)
    contours, _ = cv2.findContours(binary, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    contour_image = frame.copy()
    contour_image[:] = 0 

    cv2.drawContours(contour_image, contours, -1, (255, 255, 255), thickness=2)
    return contour_image

def mark_slots(frame, grayscale_frame, key):
    global last_call_time
    global prevFreeslots
    global k_, j
    current_time = time.time()


    freeslots=0
    current_time = time.time()
    if key and rect_height and current_time - last_call_time >= 3:
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

            count=cv2.countNonZero(gray_crop)

            resized_crop = cv2.resize(crop_frame, (128, 128))
            resized_crop = resized_crop.reshape(1,resized_crop.shape[0],resized_crop.shape[1],3)

            if count < 200 and not np.argmax(model.predict([resized_crop])):
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
                if not ret: return 0
                ret, frame = cap.read()
                if not ret: return 0

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

                    cv2.rectangle(frame, start_point, stop_point, color, thick)
                
                cv2.putText(frame, "Free Slots:" + str(prevFreeslots), (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (200, 255, 255), 2)
                x = 1 - prevFreeslots/len(parking_slots)
                price = (pow(2.72, .25*x)/(1 + pow(2.72, .25* x)) * b * x) + a
                cv2.putText(frame, "Ticket Price:" + str(round(price)), (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (200, 255, 255), 2)

                cv2.imshow("Parking Spot Detector", frame)    
                cv2.waitKey(1)

    elif rect_height:
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

            count=cv2.countNonZero(gray_crop)
            
            # if not parking_values[i]:
            if count < threshold:
                freeslots = freeslots + 1
                color, thick = [(0,255,0), 2]
                try: parking_values[i] = 0
                except: parking_values.append(0)
                # cv2.imwrite(f"Data/Free/{k_ + 1}.jpg", crop_frame)
                # k_ += 1
            else:
                color, thick = [(0,0,255), 2]
                try: parking_values[i] = 1
                except: parking_values.append(1)
                # cv2.imwrite(f"Data/Parked/{j + 1}.jpg", crop_frame)
                # j += 1
            i += 1

            cv2.rectangle(frame, start_point, stop_point, color, thick)
            # cv2.putText(frame, str(count), start_point, cv2.FONT_HERSHEY_SIMPLEX, 1, (200, 255, 255), 2)

    if key:
        cv2.putText(frame, "Free Slots:" + str(freeslots), (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (200, 255, 255), 2)
        x = 1 - freeslots/len(parking_slots)
        price = (pow(2.72, .25*x)/(1 + pow(2.72, .25* x)) * b * x) + a
        cv2.putText(frame, "Ticket Price:" + str(round(price)), (10, 60), cv2.FONT_HERSHEY_SIMPLEX, 1, (200, 255, 255), 2)
        prevFreeslots = freeslots

    return frame

cv2.namedWindow("Parking Spot Detector")
cv2.setMouseCallback("Parking Spot Detector", click_event)

ret, frame = cap.read()
key = False

while True:
    if key:
        ret, frame = cap.read()

        if not ret:break

        if len(parking_slots) > len(parking_values): parking_values.append(0)
        grayscale_frame = convert_grayscale(frame)
        out_image = mark_slots(frame, grayscale_frame, key)
        cv2.imshow("Parking Spot Detector", out_image)     
        # cv2.imshow("Parking Spot Detector", grayscale_frame)
    
        k = cv2.waitKey(8)
        if k & 0xFF == ord('q'):
            break
        if k & 0xFF == ord('a'):
            key = False
    
    else:
        if(len(parking_slots) == 2 and not rect_height):
            rect_width, rect_height = parking_slots[1][0] - parking_slots[0][0], parking_slots[1][1] - parking_slots[0][1]
            print(parking_slots)
            print(rect_width, rect_height)
            del parking_slots[1]

        # parking_values = [0] * len(parking_slots)
            
        grayscale_frame = convert_grayscale(frame)
        out_image = mark_slots(frame, grayscale_frame, key)  
        cv2.imshow("Parking Spot Detector", out_image)

        k = cv2.waitKey(1)
        if k & 0xFF == ord('a'):
            key = True
        if k & 0xFF == ord('z'):
            del parking_slots[-1]
        if k & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()

print(parking_slots)
print(rect_height, rect_width)