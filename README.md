# Imgur Search Abstraction Layer
By Coby Tao
As part of [FreeCodeCamp's curriculum](https://www.freecodecamp.com/challenges/image-search-abstraction-layer)

### User Stories
1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
2. I can paginate through the responses by adding an offset=2 parameter to the URL.
3. I can get a list of the most recently submitted search strings.

### Example Usage
* Search for query "dog" without pagination: ```https://ct-imagesearch.herokuapp.com/search?q=dog```
* Search for query "dog" with pagination: ```https://ct-imagesearch.herokuapp.com/search?q=dog&offset=10```
* Retrieve latest searches: ```https://ct-imagesearch.herokuapp.com/latestsearches```

### Live Site
https://ct-imagesearch.herokuapp.com/