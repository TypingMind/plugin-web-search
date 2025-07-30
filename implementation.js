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
       return JSON.stringify(response);
    });
}
