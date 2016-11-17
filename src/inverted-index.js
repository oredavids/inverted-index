class InvertedIndex {

  constructor() {
    //Object to hold the index
    this.index = {};
  }

  /** 
   * @param{String} words - String to be tokonized
   * @return{Array} cleanContent
   */
  tokenize(words) {
    const cleanContent = words.trim().replace(/-/g, ' ')
      .replace(/[.,\/#!$%\^&@\*;:'{}=\_`~()]/g, '')
      .toLowerCase().split(' ').sort();
    return cleanContent;
  }

  /**
   * @param{String} words - The string to be filtered
   * @return{Array} tokens - Without duplicated words
   */
  uniqueWords(words) {
    const tokens = this.tokenize(words);
    return tokens.filter((item, index) => {
      return tokens.indexOf(item) === index;
    });

  }

  /**
   * @param{Array} fileToIndex - Array of contents of the JSON file to index
   * @return{Object} index - That maps words to locations(documents)
   */
  createIndex(fileToIndex) {
    const wordsToIndex = [];
    const index = {};
    for (let document of fileToIndex) {
      if (document.text) {
        wordsToIndex.push(document.title.toLowerCase() + ' ' +
          document.text.toLowerCase());
      } else {
        return 'JSON file is Empty';
      }

    }
    const uniqueContent = this.uniqueWords(wordsToIndex.join(' '));
    uniqueContent.forEach((word) => {
      index[word] = [];
      wordsToIndex.forEach((document, indexPosition) => {
        if (document.indexOf(word) > -1) {
          index[word].push(indexPosition);
        }
      });
    });
    this.index = index;
    return index;
  }

  getIndex() {
    return this.index;
  }

  /**
   * @param{String} searchString, searchIndex - Search query
   * @return{Object} searchResults - Maps searched words to document locations
   */
  searchIndex(searchWords, indexToSearch) {
    const searchResults = {};
    const searchTerms = this.uniqueWords(searchWords);
    for (let word of searchTerms) {
      if (indexToSearch[word]) {
        searchResults[word] = indexToSearch[word];
      } else {
        searchResults[word] = `We are Sorry but ${word} is not found in our database`;
      }

    }

    return searchResults;
  }

}
