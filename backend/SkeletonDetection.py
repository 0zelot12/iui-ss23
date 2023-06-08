import mediapipe as mp
from mediapipe.tasks import python
import cv2
import mediapipe as mp

mp_hands = mp.solutions.hands

hands = mp_hands.Hands(static_image_mode=True)

mp_drawing_utils = mp.solutions.drawing_utils

frame = cv2.imread("../thumbs-up.png")
frame_overwritten = frame.copy()
results = hands.process(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))

for hand_landmarks in results.multi_hand_landmarks:
    mp_drawing_utils.draw_landmarks(frame_overwritten, hand_landmarks,
                                    mp_hands.HAND_CONNECTIONS)


cv2.imshow("Result", frame_overwritten)
cv2.waitKey()