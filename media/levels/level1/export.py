# ----------------------------------------------------------------------
# Exportador de nivel
# Jose Martinez, 2016
# ----------------------------------------------------------------------

# Variables de nivel
# ----------------------------------------------------------------------
LEVEL = 1

# ----------------------------------------------------------------------
import bpy, os, sys
import mathutils
from math import *
from bpy import *

# ----------------------------------------------------------------------
ID1 = ' '*2    # Identadores para el xml
ID2 = ' '*4    # Solo con proposito de obtener un xml "bonito"
ID3 = ' '*6
ID4 = ' '*8

# ----------------------------------------------------------------------
def getCurrentPath():
    #arr = os.path.dirname(__file__).split("/")
    #folder = ""
    #for i in range(len(arr)-1):
    #    folder = folder + arr[i] + "/"
    #return folder + "output.xml"
    
    return "C:\wamp64\www\ShooterDemo\media\levels\level1\output.xml"
    
    #return "C:\wamp\www\ShooterDemo\media\levels\level1\output.xml"

# Función que hace la exportación de un tipo de elemento
# que es recibido por parámetro
# ----------------------------------------------------------------------
def exportElements(element):
    elCounter = 0
    obs = [ob for ob in bpy.data.objects]
    for el in obs:
        eName = el.name    	
        if (eName.find(element) != -1):
            elCounter = elCounter + 1
            print(ID1 + '<element id="'+element+'" index="'+str(elCounter)+'" type="'+element.upper()+'">')
            print(ID2 + "<mesh>"+element+"</mesh>")  
            x,y,z = el.location
            print (ID2 + '<x>%f</x> <y>%f</y> <z>%f</z>' % (x,y,z))
            qw,qx,qy,qz = el.rotation_quaternion
            print (ID2 + '<rx>%f</rx> <ry>%f</ry> <rz>%f</rz> <rw>%f</rw>' % (qx,qy,qz,qw))
            print(ID1 + "</element>")         
           
         
# Función para exportar las cámaras
# ------------------------------------------------------------------------
def exportCameras():         
    obs = [ob for ob in bpy.data.objects if ob.name.find("cCamera") != -1]
   
    for camera in obs:
    	camId = camera.name
    	camName = camId.split("_")[0]
    	camIndex = int(camId.split("_")[1])
    	camFrames = int (camId.split("_")[2])
    	print (ID1 + '<element index="%i" fps="%i" type="CCAMERA">' % (camIndex, bpy.data.scenes['Scene'].render.fps))
    	print (ID2 + '<path>')
    	for i in range (camFrames):
    		cFrame = bpy.data.scenes['Scene'].frame_current
    		bpy.data.scenes['Scene'].frame_set(cFrame+1)
    		x,y,z = camera.matrix_world.translation
    		qw,qx,qy,qz = camera.matrix_world.to_quaternion()
    		print (ID3 + '<frame index="%i">' % (i+1))
    		print (ID4 + '<x>%f</x> <y>%f</y> <z>%f</z>' % (x,y,z))
    		print (ID4 + '<rx>%f</rx> <ry>%f</ry> <rz>%f</rz> <rw>%f</rw>' % (qx,qy,qz,qw))
    		print (ID3 + '</frame>')
    	print (ID2 + '</path>')
    	print (ID1 + '</element>')

            
# ################################################################################
# Exportar!!!!
# ################################################################################
FILENAME = getCurrentPath()
file = open(FILENAME, "w")
std=sys.stdout
sys.stdout=file

print ("<?xml version='1.0' encoding='UTF-8'?>")
print ("<map>")
print(ID1 + "<level>"+str(LEVEL)+"</level>")
print(ID1 + "<levelType>FPS</levelType>")

exportElements("plane")
exportElements("player")
exportCameras()



print ("</map>")

file.close()
sys.stdout = std            