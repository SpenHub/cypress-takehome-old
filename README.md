# QA Take Home Assignment

Here's my submission for the QA Engineering Role

# Manual Test Plan

I wasn't quite sure how in-depth to make these tests so I tried to test all the "AC" from that Front-End prompt, and any additonal tests I thought required. My testing efforts sometimes are very brief with basic descriptions, to those with explicit steps and validation critera. Please exuse if the test-plan is either too explicit or too implicit. 

## Site-Content

|Test Case|Pass?|
|---------|-----|
|Search bar visible| / |
|Search bar placeholder text present| / |
|Instruction Text Visible| /|
|"Dogs!" title visible|/|
|12 Dog tiles present|/|  
|Grid of \<breed\> pictures appear when clicking breed|/|      
|Refresh clears previous search-term|/|                                                                                                                                      |  | | 

## Network

|Test Case|Pass?|
|---------|-----|
|Page-load: Network request to `dog.ceo/api/breeds/list/all`|/|
|Dog-Selected: Network request to `dog.ceo/api/breed/{breed_name}/images`|/|
|Second-load of dog-tile shouldn't make network request|/|



## UI/UX
|Test Case|Pass?|
|---------|-----|
|Hovering on Dog button triggers emphasis|/|      
|Clicking on dog button changes button style to show selection|/|      
|Clicking on dog button shows dog tile with breed selection|/|   
|Loading indicator (yellow bg) when clicking on dog-breed tile for first time||      
|Responsive: 4x3 grid of dog breeds visible on default width|/|       
|Responsive: 2x6 grid of dog breeds when width < 767px  |/|    
|Responsive: Triggering small-width page-view: dog picture tile grid two-wide|/|      

## Search Functionality
|Test Case|Pass?|
|---------|-----|
|Searching for visible breed: Breed tile is returned|/|
|Searching for non-visible breed: Breed tile is returned|/|
|Partial-Match Search: Only show first 12 breeds|/|
|Full-Match Search: Only show matching breed|/|

#### Negative
|Test Case|Pass?|
|---------|-----|
|Empty search box shows first 12 dog breeds| /| 
|Non-letter charset results in "NO BREED MATCHES FOUND."|/|
|Searching for non-existent breed: "NO BREED MATCHES FOUND."|/|


# Automated Test Info

 - I've implemented my automation-suite using cypress.io. I had some difficulty around programmatically selecting those dog-buttons as they're using dynamic class names. I spent more time than I care to admit on that, so I've disable that test. If I were at SimSpace I would've asked for help at that point. 
 - Additionally I wrote everything in JS for quick prototyping. 


