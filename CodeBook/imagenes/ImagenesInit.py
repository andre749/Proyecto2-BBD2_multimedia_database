from numpy import ndarray as vector
from random import randint
import cv2
import glob
import os

file_path="/home/andre/PycharmProjects/Proyecto2-BBD2_multimedia_database/datasets/dataset_images/images"
K=10
VECSIZE=128
MAXVALUE=255


def init_random_vector()->list:
	v:list=[128]
	for i in range(VECSIZE):
		v[i]=randint(0,255)
	return v


def distancia_vec(v1:list|vector,v2:list|vector)->int:
	d=0
	for i in range(VECSIZE):
		d+=(v1[i]-v2[i])**2
	return d**(1/2)

def create_k_means():
	kmeans:list=[K]
	for i in range(K):
		kmeans[i]=init_random_vector()
	return kmeans

def recalc_cluster_mean(mean:vector|list,cluster:list[list[vector]]):
	for i in range(VECSIZE):
		s=0
		for j in range(len(cluster)):
			s+=cluster[j][i]
		s/=len(cluster)
		mean[i]=s
def recalc_kmeans(kmeans:list[list],clusters:list[list]):
	for i in range(K):
		recalc_cluster_mean(kmeans[i],clusters[i])

def vectorize_images(file_path:str):
	sift=cv2.SIFT.create()
	vectorized_images:dict={}
	for ruta_imagen in glob.glob(file_path):
		print(len(vectorized_images))
		if len(vectorized_images)>=10:
			return vectorized_images
		imagen = cv2.imread(ruta_imagen)
		if imagen is None:
			print(f"Error al leer: {ruta_imagen}")
			continue
		grey_image=cv2.cvtColor(imagen, cv2.COLOR_BGR2GRAY)
		keypoints,descriptors=sift.detectAndCompute(grey_image, None)
		name = os.path.basename(ruta_imagen)
		vectorized_images[name]=descriptors
	return vectorized_images

def closest_mean_index(v:vector,kmeans:list)->int :
	index=0
	min_dist=distancia_vec(v,kmeans[0])
	for i in range(K):
		d=distancia_vec(v,kmeans[i])
		if d<min_dist:
			index=i
			min_dist=d
	return index


def init_kmeans(images:dict[str,vector]):
	kmeans=create_k_means()
	clusters:list[list[vector]]=[[]*K]
	images_means:dict[str,list[int]]={}

	#first iteration
	for image in images:
		for vec in images[image]:
			index=closest_mean_index(vec,kmeans)
			images_means[image].append(index)
			clusters[index].append(vec)

	recalc_cluster_mean(kmeans,clusters)

	#recalibration
	iterations=0
	changes=0
	while iterations<100:
		changes=0
		for image in images:
			size=len(images[image])
			for i in range(size):
				#esto me falta xd
				pass


		iterations+=1

if __name__=="__main__":
	images=vectorize_images(file_path+"/*.jpg")
	for image in images:
		print(image,images[image])


