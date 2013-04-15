 "use strict";

(function($) {

	var TagsInput = function(element, options) {
		this.init('tagsinput', element, options);
	};

	TagsInput.prototype.init = function(type, element, options) {
		this.type = type;
		this.$element = $(element);
		this.options = this.getOptions(options);
		this.tags = [];
		this.tagDOMs = {};
		this.mode = {
			deleteLastTag: false
		};

		this.$element.css({
			'margin-bottom': 0
		});
		this.$element.on('paste change keyup blur', $.proxy(this.typing, this));
		this.$element.on('keydown', $.proxy(this.keydown, this));
	};

	TagsInput.prototype.getOptions = function(options) {
		options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data());

		return options;
	};

	TagsInput.prototype.keydown = function(e) {
		// Backspace to delete last tag
		if (e.keyCode == 8) {
			if (this.$element.val() == '') {
				this.mode.deleteLastTag = true;
			}

			return;
		}

		// Allow TAB to confirm tag, and disable default functionality
		if (e.keyCode == 9)
			e.preventDefault();
	};

	TagsInput.prototype.typing = function(e) {
		var self = this;

		var value = _trim(this.$element.val());
		if (value.length == 0) {

			// Backspace
			if (e.keyCode == 8 && this.mode.deleteLastTag) {
				self.pop();
			}

			this.mode.deleteLastTag = false;

			return;
		}

		// Separator
		var tags = value.split(',');
		if (tags.length > 1) {
			var newTags = tags.splice(0, tags.length - 1);

			newTags.forEach(function(tag, index, tags) {
				var tagName = _trim(tag);

				// Ignore blank
				if (tagName == '')
					return;

				self.add(tagName);
			});

			// Put last trim in input box
			this.$element.val(_trim(tags[0]));

			return;
		}

		// Add tag to list
		if (self.options.delimeters.indexOf(e.keyCode) != -1 || e.type == 'blur') {
			self.add(value);

			// Clear input box
			this.$element.val('');
			return;
		}
	};

	TagsInput.prototype.add = function(tagName) {
		var self = this;

		// Tag exists already
		if (self.tags.indexOf(tagName) != -1) {
			return;
		}

		// Create a label
		var $label = $('<span>')
			.addClass('label label-important pull-left')
			.text(tagName);
		self.$element.before($label);

		// Button for delete
		var $removeBtn = $('<i>')
			.css('cursor', 'pointer')
			.addClass('icon-remove')
			.tooltip({ 'title': 'Remove this Tag' });

		$removeBtn.on('click', function() {
			$(this).tooltip('hide');
			self.remove(tagName);
		});
		$label.append($removeBtn);

		self.tags.push(tagName);
		self.tagDOMs[tagName] = $label;
	};

	TagsInput.prototype.pop = function() {
		var self = this;

		if (self.tags.length == 0)
			return;

		var tagName = self.tags.pop();
		self.tagDOMs[tagName].remove();
		delete self.tagDOMs[tagName];
	};

	TagsInput.prototype.getAll = function(callback) {
		if (callback) {
			callback(this.tags);
		}
	};

	TagsInput.prototype.remove = function(tagName) {
		var self = this;

		var index = self.tags.indexOf(tagName);
		if (index != -1) {
			self.tags.splice(index, 1);
		}

		if (tagName in self.tagDOMs) {
			self.tagDOMs[tagName].remove();
			delete self.tagDOMs[tagName];
		}
	};

	TagsInput.prototype.clear = function() {
		var self = this;

		self.tags.forEach(function(tagName, index, tags) {
			self.tagDOMs[tagName].remove();
			delete self.tagDOMs[tagName];
		});

		self.tags = [];
	};

	$.fn.tagsinput = function(option) {
		var args = Array.prototype.slice.call(arguments);

		return this.each(function() {
			var $this = $(this);
			var data = $this.data('tagsinput');
			var options = options = typeof option == 'object' && option;

			if (!data)
				$this.data('tagsinput', (data = new TagsInput(this, options)))

			if (typeof option == 'string') {
				data[option].apply(data, args.slice(1, args.length));
			}
		});
	};

	function _trim(str) {
		return str.replace(/(^[\\s]*)|([\\s]*$)/g, "");
	} 

	$.fn.tagsinput.Constructor = TagsInput;

	$.fn.tagsinput.defaults = {
		delimeters: [ 44, 188, 13, 9 ]
	};

})(jQuery);
