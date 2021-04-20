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


### Build Classifier

Now we can build our classifier, navigate to [https://www.customvision.ai](https://www.customvision.ai/?WT.mc_id=aiml-25242-heboelma) and choose sign in. Sign in with your Azure credentials account.

> Accept the terms and conditions box to continue.

#### Create Project

Once loaded choose 'New Project' which opens a window to enter details:

* Name: choose a suitable name
* Description: add a description of the classifier (example shown in image below)
* Resource Group: choose the resource group you created your custom vision service in (example: workshop[SO])
* Project Types: Classification
* Classification Types: Multiclass (Single tag per image)
* Domains: Retail (compact)
* Export Capabilities: Basic platforms

![Create Custom Vision Project](docsimages/createClassifier.png)

Click on 'Create Project' and you will land on an empty workspace.

#### Add Images

Now you can start adding images and assigning them tags to create our image classifier.

* Download and unzip the [Simpsons Lego Dataset](https://github.com/hnky/dataset-lego-figures/raw/master/_download/simpsons-lego-dataset.zip)

* In the top left, select 'Add images', browse for the first folder of images - Bart Simpson - and select all the images in the folder.

* Add the tag 'Bart Simpson' to the Bart Simpson images and select 'Upload files'

Once successful, you receive a confirmation message and you should see that your images are now available in the workspace.

![Upload images of drills](docsimages/addSimpsons.png)

Now complete the same steps of uploading and tagging images for the other Simpsons in the folder. For each type of Simpson:

* Click 'Add images'
* Select all the images
* Add the class label (Lisa, Marge, etc.)
* Choose upload
* Confirm images uploaded into the workspace

Now you should have all categories uploaded and on the left hand side you can see your Simpsons classes and you can filter depending on type of Simpson image.

#### Train Model

Now you are ready to train your algorithm on the Simpsons image data you have uploaded. Select the green **'Train'** button in the top right corner. For this demo, you can use the "Fast Training" option.

Once the training process is complete it will take you to the Performance tab. Here you will receive machine learning evaluation metrics for your model. Here you algo get information regarding the class imbalance, as some Simpsons have less images than others.

![Evaluation Medtrics](docsimages/trainMetrics.png)

#### Test Model

Now you have a model, you need to test the model. Choose the 'Quick Test' button in the top right *(next to the train button)* this will open a window where you can browse for a local image or enter a web URL.

Use one of the image links below (images the model have not been trained on) and paste the link in the Image URL field. The image will be analysed and a result returned of what Simpson the model thinks it is (prediction tag) and the models confidence of its result (prediction probability).
```
https://raw.githubusercontent.com/hnky/dataset-lego-figures/master/_test/Bart.jpg
```

![Quick Test](docsimages/QuickTest.png)

> Repeat this process for other image in the test folder, or search online for other images to see how the model performs.

```
https://raw.githubusercontent.com/hnky/dataset-lego-figures/master/_test/Krusty.jpg
https://raw.githubusercontent.com/hnky/dataset-lego-figures/master/_test/Bart.jpg
https://raw.githubusercontent.com/hnky/dataset-lego-figures/master/_test/Flanders.jpg
https://raw.githubusercontent.com/hnky/dataset-lego-figures/master/_test/Homer.jpg
https://raw.githubusercontent.com/hnky/dataset-lego-figures/master/_test/Lisa.jpg
https://raw.githubusercontent.com/hnky/dataset-lego-figures/master/_test/marge.jpg
https://raw.githubusercontent.com/hnky/dataset-lego-figures/master/_test/Milhouse.jpg
https://raw.githubusercontent.com/hnky/dataset-lego-figures/master/_test/MrBurns.jpg
https://raw.githubusercontent.com/hnky/dataset-lego-figures/master/_test/Wiggum.jpg
```

#### Publish Model

To use this model within applications you need the prediction details. Therefore, you have to go to the Performance tab from the top bar, click the **Publish** button.

![Prediction model](docsimages/publishModel.png)

Please provide a name for your model and select the Prediction resource, and click on Publish. Please take notice of you Publication Resource, which you need in the second task.

![Prediction model resource](docsimages/publishModel2.png)

You can now select the **Prediction URL** button to gain all information you need to create a Postman call to your API.

![Prediction model URL](docsimages/predictionURL.png)