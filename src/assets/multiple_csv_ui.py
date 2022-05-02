# -*- coding: utf-8 -*-
"""
Created on Wed Feb  9 16:41:33 2022

@author: Amitabh 2
"""

# -*- coding: utf-8 -*-
"""
Created on Wed Feb  9 16:06:17 2022

@author: Amitabh 2
"""

# -*- coding: utf-8 -*-
"""
Created on Wed Feb  9 09:54:01 2022

@author: Amitabh 2
"""

import cv2
import numpy as np
import streamlit as st
import tensorflow as tf
import pandas as pd
from numpy.lib.scimath import sqrt as csqrt
from time import sleep

from scipy import ifft
import matplotlib.pyplot as plt

from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.mobilenet_v2 import MobileNetV2,preprocess_input as mobilenet_v2_preprocess_input

model = tf.keras.models.load_model("C:/Users/Amitabh 2/Downloads/living_nonliving.h5")
### load file
i=csqrt(-1)
a=[];
preds=[];
csv_file = st.file_uploader("Choose a csv file", type="csv", accept_multiple_files= True)


map_dict = [{0: 'living',
            1: 'nonliving',
            }]


if csv_file is not None:
    # TODO : apply for loop here
    for i in range(len(csv_file)):
        t=pd.read_csv(csv_file[i],skiprows=31,header=None)
        t[3]=t[1]+i*t[2]
         
        x=t.iloc[:100,3]
        z=np.array(x)
        zf=abs(ifft(z))
        b=zf.reshape(100,1)
        a.append(b)
        plt.imsave("F:/%03d.jpg"%i, b)


        uploaded_file = cv2.imread('F:/%03d.jpg'%i)
    # Convert the file to an opencv image.
  #  file_bytes = np.asarray(bytearray(uploaded_file.read()), dtype=np.uint8)
   # opencv_image = cv2.imdecode(uploaded_file, 1)
        opencv_image = cv2.cvtColor(uploaded_file, cv2.COLOR_BGR2RGB)
        resized = cv2.resize(opencv_image,(128,128))
    # Now do something with the image! For example, let's display it:
        st.image(opencv_image, channels="RGB")

        resized = mobilenet_v2_preprocess_input(resized)
        img_reshape = resized[np.newaxis,...]
       # Genrate_pred = st.button("Generate Prediction")    
#if Genrate_pred:
    
      # TODO : apply for loop here
        prediction = model.predict(img_reshape).argmax()
        if prediction==0:
            p='living'
        else:
            p='non living'
        preds.append(p)
        
        #preds1 = st.multiselect("Estimated Predictions", preds)
 
# write the selected options
    st.write(preds)
    #st.title("Predicted Label for the image is {}".format(map_dict [prediction]))
    #st.title("Prediction is {} :".format(elem) for elem in preds)
sleep(10)