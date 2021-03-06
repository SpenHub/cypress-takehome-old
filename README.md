# QA Take Home Assignment

Here's my submission for the QA Engineering Role

# Manual Test Plan

I wasn't quite sure how in-depth to make these tests so I tried to test all the "AC" from that Front-End prompt, and any additonal tests I thought required. My testing efforts sometimes are very brief with basic descriptions, to those with explicit steps and validation critera. Please exuse if the test-plan is either too explicit or too implicit. 

## Site-Content

|Test Case|Pass?|
|---------|-----|
|Search bar visible
- Test1
- Test2
- Test3|:heavy_check_mark:|
|Search bar placeholder text present|:heavy_check_mark:|
|Instruction Text Visible|:heavy_check_mark:|
|"Dogs!" title visible|:heavy_check_mark:|
|12 Dog tiles present|:heavy_check_mark:|  
|Grid of \<breed\> pictures appear when clicking breed|:heavy_check_mark:|      
|Refresh clears previous search-term|:heavy_check_mark:|                                                                                                                                      |  | | 

## Network

|Test Case|Pass?|
|---------|-----|
|Page-load: Network request to `dog.ceo/api/breeds/list/all`|:heavy_check_mark:|
|Dog-Selected: Network request to `dog.ceo/api/breed/{breed_name}/images`|:heavy_check_mark:|
|Second-load of dog-tile shouldn't make network request|:heavy_check_mark:|



## UI/UX
|Test Case|Pass?|
|---------|-----|
|Hovering on Dog button triggers emphasis|:heavy_check_mark:|      
|Clicking on dog button changes button style to show selection|:heavy_check_mark:|      
|Clicking on dog button shows dog tile with breed selection|:heavy_check_mark:|   
|Loading indicator (yellow bg) when clicking on dog-breed tile for first time|:heavy_check_mark:|      
|Responsive: 4x3 grid of dog breeds visible on default width|:heavy_check_mark:|       
|Responsive: 2x6 grid of dog breeds when width < 767px  |:heavy_check_mark:|    
|Responsive: Triggering small-width page-view: dog picture tile grid two-wide|:heavy_check_mark:|      

## Search Functionality
|Test Case|Pass?|
|---------|-----|
|Searching for visible breed: Breed tile is returned|:heavy_check_mark:|
|Searching for non-visible breed: Breed tile is returned|:heavy_check_mark:|
|Partial-Match Search: Only show first 12 breeds|:heavy_check_mark:|
|Full-Match Search: Only show matching breed|:heavy_check_mark:|

#### Negative
|Test Case|Pass?|
|---------|-----|
|Empty search box shows first 12 dog breeds| :heavy_check_mark:| 
|Non-letter charset results in "NO BREED MATCHES FOUND."|:heavy_check_mark:|
|Searching for non-existent breed: "NO BREED MATCHES FOUND."|:heavy_check_mark:|


# Automated Test Info

 - I've implemented my automation-suite using cypress.io. I had some difficulty around programmatically selecting those dog-buttons as they're using dynamic class names. I spent more time than I care to admit on that. I understand it's not the best method of selecting an element on a page, but those were the only consistent things I saw in the DOM other than the DOM structure which is even ***more*** brittle. 
 - Additionally I wrote everything in JS so I wouldn't eat up too much time getting the tooling for TS setup