(function(window, undefined) {
	var auiSearch = function() {};

	auiSearch.prototype = {
		init: function(params) {
			this.onSearchCompleted = params.onSearchCompleted;
			this.onClearCompleted = params.onClearCompleted;
			var self = this;

			var searchBar = document.querySelector(".aui-searchbar");
			var searchBarInput = document.querySelector(".aui-searchbar input");
			var searchBarBtn = document.querySelector(".aui-searchbar .aui-searchbar-btn");
			var searchBarClearBtn = document.querySelector(".aui-searchbar .aui-searchbar-clear-btn");
			searchBarBtn.style.marginRight = 0;
			if(searchBar) {				
				searchBarInput.oninput = function() {
					if(this.value.length)
						searchBarClearBtn.style.display = 'block';
					else
						searchBarClearBtn.style.display = 'none';
				}
			}
			searchBarClearBtn.onclick = function(callback) {
				this.style.display = 'none';
				searchBarInput.value = '';
				if(self.onClearCompleted && typeof self.onClearCompleted == 'function')
					self.onClearCompleted();
			}
			searchBarBtn.onclick = function(callback) {
				var keywords = searchBarInput.value;
				searchBarInput.blur();
				
				if(self.onSearchCompleted && typeof self.onSearchCompleted == 'function')
					self.onSearchCompleted(keywords);
			}
		}
	};

	window.auiSearch = auiSearch;
})(window);