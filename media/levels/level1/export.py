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
ID5 = ' '*8

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
            print (ID2 + '<x>%.2f</x> <y>%.2f</y> <z>%.2f</z>' % (round(x,2),round(z,2),round(-y,2)))
            rw,rx,ry,rz = el.rotation_quaternion
            print (ID2 + '<rw>%.2f</rw> <rx>%.2f</rx> <ry>%.2f</ry> <rz>%.2f</rz>' % (round(rw,2), round(rx,2),round(rz,2),round(-ry,2)))
            print(ID1 + "</element>")         
            
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

exportElements("plane")
exportElements("camera")
exportElements("player")

print ("</map>")

file.close()
sys.stdout = std            