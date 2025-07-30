function get_web_search_results(params, userSettings) {
  var keyword = params.keyword;
  var cx = userSettings.searchEngineID;
  var key = userSettings.searchEngineAPIKey;

  if (!cx || !key) {
    throw new Error(
      'Please set the Search Engine ID and API Key in the plugin settings.'
    );
  }

  return fetch(
    `https://customsearch.googleapis.com/customsearch/v1?q=${encodeURIComponent(
      keyword
    )}&key=${key}&cx=${cx}`
  )
    .then((r) => r.json())
    .then((response) => {
      if (response.error) {
        throw new Error('Error: ' + response.error.message);
      }
      const items = response.items;

      if (!items) {
        return 'No results found';
      }
      
      return items
        .map(
          (item) => `
Title: ${item.title}
Result: ${item.snippet}
URL: ${item.link}
 `
        )
        .join('');
    });
}
