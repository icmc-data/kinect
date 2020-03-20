Kinect Data
================

This project has a proposal to make it possible to play a game through movements using a webcan and deep learning.

The project use TensorFlowJS to do the classification.

The classification of the moviments is made by passing the captured image from the webcan to the mobileNet of TFJS, using the layer before the classification layer as a embedding, and classifying this embedding with a KNNClassifier.

Installation
------------
1. Clone this repository: ``` git clone https://github.com/icmc-data/kinect```
2. ```cd kinect/bomberman```
3. Make sure you have `bower` and `simplehttpserver` installed: ```npm install -g bower simplehttpserver```
3. Download dependencies: ```bower install```
4. Run the HTTP server: ```simplehttpserver```
5. Launch http://127.0.0.1:8000 


The game was made by git ```clone https://github.com/MattSkala/html5-bombergirl.git```
