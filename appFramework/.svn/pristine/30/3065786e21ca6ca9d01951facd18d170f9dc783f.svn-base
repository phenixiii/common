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
				if(searchBar) {
					searchBarInput.onclick = function() {
						searchBarBtn.style.marginRight = 0;
					}
					searchBarInput.oninput = function() {
						if(this.value.length) {
							searchBarClearBtn.style.display = 'block';
							searchBarBtn.classList.add("aui-text-warning");
							searchBarBtn.textContent = "搜索";
						} else {
							searchBarClearBtn.style.display = 'none';
							searchBarBtn.classList.remove("aui-text-warning");
							searchBarBtn.textContent = "取消";
							if(self.onClearCompleted && typeof self.onClearCompleted == 'function')
								self.onClearCompleted();
						}
					}
				}
				searchBarClearBtn.onclick = function(callback) {
					this.style.display = 'none';
					searchBarInput.value = '';
					searchBarBtn.classList.remove("aui-text-warning");
					searchBarBtn.textContent = "取消";
					if(self.onClearCompleted && typeof self.onClearCompleted == 'function')
						self.onClearCompleted();
				}
				searchBarBtn.onclick = function(callback) {
					var keywords = searchBarInput.value;
					if(keywords.length) {
						searchBarInput.blur();
						if(self.onSearchCompleted && typeof self.onSearchCompleted == 'function')
							self.onSearchCompleted(keywords);
					} else {
						this.style.marginRight = "-" + this.offsetWidth + "px";
						searchBarInput.value = '';
						searchBarInput.blur();
					}
				}
			}
		};

		window.auiSearch = auiSearch;
	})(window);