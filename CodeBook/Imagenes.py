import cv2
path="/home/andre/PycharmProjects/Proyecto2-BBD2_multimedia_database/datasets/dataset_images/images/1163.jpg"
image=cv2.imread(path)
if image is None:
    raise FileNotFoundError("Could not open or find the image.")

# 2. Convert to grayscale
# SIFT operates strictly on single-channel luminance data
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# 3. Instantiate the SIFT detector
sift = cv2.SIFT_create()

# 4. Extract keypoints and computing descriptors
# 'keypoints' is a list of cv2.KeyPoint objects
# 'descriptors' is a 2D NumPy array of shape (num_keypoints, 128)
keypoints, descriptors = sift.detectAndCompute(gray_image, None)

print(f"Total Keypoints Detected: {len(keypoints)}")
print(f"Descriptor Matrix Shape: {descriptors.shape}")
print("keypoints: ",keypoints)
print("descriptors: ",descriptors)






def draw_kp(image):
    # 5. Render keypoints with scale and orientation information
    # DRAW_RICH_KEYPOINTS overlays circles showing size and direction of features
    output_image = cv2.drawKeypoints(
        image,
        keypoints,
        None,
        flags=cv2.DRAW_MATCHES_FLAGS_DRAW_RICH_KEYPOINTS
    )

    # 6. Save and view the output image
    cv2.imwrite('sift_features_output.jpg', output_image)
    cv2.imshow('SIFT Feature Landmarks', output_image)