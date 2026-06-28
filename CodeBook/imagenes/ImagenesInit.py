from numpy import ndarray as vector
from random import randint
K=10
VECSIZE=128
MAXVALUE=255


def init_random_vector()->list:
	v:list=[128]
	for i in range(VECSIZE):
		v[i]=randint(0,255)
	return v
def distancia_vec(v1:vector,v2:vector)->int:
	d=0
	for i in range(VECSIZE):
		d+=(v1[i]-v2[i])**2
	return d**(1/2)

def cerate_k_means():
	kmeans:list=[K]
	for i in range(K):
		kmeans[i]=init_random_vector()
	return kmeans

def recalc_cluster_mean(mean:vector,cluster:list[vector]):
	for i in range(VECSIZE):
		s=0
		for j in range(len(cluster)):
			s+=cluster[j][i]
		s/=len(cluster)
		mean[i]=s

def init_kmeans(kmeans:list[list]):
	pass

