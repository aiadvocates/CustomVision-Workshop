# Custom Vision - Workshop

Hi everyone and welcome. In this tutorial you are going to create a Machine Learning model that can identify object that you hold in front of a camera.

## 1. Setting up Azure

### Getting an Azure Subscription
To run this tutorial you need to have an Azure Subscription. If you are a minor you should ask one of your parent to help you with signing up. If you are above 13 year you might be able to use the [Microsoft Azure for Students Starter Offer](https://azure.microsoft.com/offers/ms-azr-0144p/?WT.mc_id=aiml-25242-heboelma)

To sign up for Azure Subscription [Click here](https://azure.microsoft.com/free/?WT.mc_id=aiml-25242-heboelma)

### Create Resource Group

First create a Resource Group.

* Go to the [Azure Portal](https://portal.azure.com/?WT.mc_id=aiml-25242-heboelma) main dashboard.
* Click 'Create a Resource' in the top left
* Search for 'Resource group'
* Enter details to create:
  * A name for the resource group
  * Select the location
  * Click Create

![Resource Group Details](docsimages/createResourceGroup.png)  

### Create Custom Vision instance

Now you create a Custom Vision instance in your Azure account.

* Go to your created Resource group
* Click +Add
* Search for Custom Vision
* Click Create
* Enter details to create:
  * A name for the service
  * Select your subscription
  * Select the data centre location (in this example West Europe, but you can select your own region)
  * Choose the S0 tier for both 'Prediction pricing tier' and Training pricing tier. F0 is possible, but you can run in some errors later on.
  * Select your created Resource group and make sure it is in the same data centre location (in this case 'customvision-demo' in 'West Europe'
  * Click Create


## 2. Build a fruit classifier

Now we can build our classifier, navigate to [https://www.customvision.ai](https://www.customvision.ai/?WT.mc_id=aiml-25242-heboelma) and choose sign in. Sign in with your Azure credentials account.

> Accept the terms and conditions box to continue.

### Create Project

Once loaded choose 'New Project' which opens a window to enter details:

* Name: Fruit Project
* Description: add a description of the classifier (example shown in image below)
* Resource Group: choose the resource group you created for your custom vision service in in the previous step.
* Project Types: Classification
* Classification Types: Multiclass (Single tag per image)
* Domains: Food (compact)
* Export Capabilities: Basic platforms

![Create Custom Vision Project](images/createClassifier.png)

Click on 'Create Project' and you will land on an empty workspace.

### Add training images

Now you can start adding images and assigning them tags to create our image classifier.

* Download and unzip the [Fruit dataset](https://github.com/aiadvocates/Fruit-Dataset/raw/main/fruit.zip)

* In the top left, select *'Add images'*, browse for the first folder of images - apple - and select all the images in the folder.

* Add the tag 'Apple' to the apple images and select 'Upload files'

Once successful, you receive a confirmation message and you should see that your images are now available in the workspace.

![Upload images of apples](images/upload.png)

Now complete the same steps of uploading and tagging images for the other fruit in the folder. For each type of fruit:

* Click 'Add images'
* Select all the images
* Add the class label (banana, Orange, etc.)
* Choose upload
* Confirm images uploaded into the workspace

Now you should have all categories uploaded and on the left hand side you can see your fruit classes and you can filter depending on type of fruit.

![Upload images of apples](images/uploadDone.png)


### Train Model

Now you are ready to train your model on the fruit image data you have uploaded. Select the green **'Train'** button in the top right corner. For this demo, you can use the "Fast Training" option. This will take a few minutes.

Once the training process is complete it will take you to the Performance tab. Here you will receive machine learning evaluation metrics for your model. 

![Evaluation Medtrics](images/trainMetrics.png)


### Test Model

Now you have a model, you need to test the model. Choose the 'Quick Test' button in the top right *(next to the train button)* this will open a window where you can browse for a local image or enter a web URL.

Use one of the image links below (images the model have not been trained on) and paste the link in the Image URL field. The image will be analysed and a result returned of what Simpson the model thinks it is (prediction tag) and the models confidence of its result (prediction probability).
```
https://github.com/aiadvocates/Fruit-Dataset/raw/main/test/apple.jpg
```

![Quick Test](images/quickTest.png)

> Repeat this process for other image in the test folder, or search online for other images to see how the model performs.

```
https://github.com/aiadvocates/Fruit-Dataset/raw/main/test/apple.jpg
https://github.com/aiadvocates/Fruit-Dataset/raw/main/test/banana.jpg
https://github.com/aiadvocates/Fruit-Dataset/raw/main/test/orange.jpg
https://github.com/aiadvocates/Fruit-Dataset/raw/main/test/pineapple.jpg
```

Now you have trainend a model that can see the difference between 4 fruits. Feel free to take out your camera and add an other fruit, or maybe create a completely different model.


## 3. Use your model in the real world
In this last part we are going to take the model you have created in step 2 and use it in an application that uses your camera and the model. 

> The goal is to hold an apple in front of your webcam and the application will tell you if it is a apple or not.


### Download the model
In this step we are going to export the model as a TensorFlow.js model. 

- Click on Performance in the top menu
- Click on Export
- Click on TensorFlow
- In the dropdownbox select TensorFlow.js
- Click Export (Wait a few seconds for the model to be ready for export)
- Click Download

![Export model](images/export.png)

## 4. Use your model in the real world
<INSERT APP>
