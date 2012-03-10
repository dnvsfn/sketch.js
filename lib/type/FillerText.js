/**@class*/
var FillerText = (function () {
	
	function FillerText () {};
	
	// http://www.lipsum.com/feed/xml
	var LOREM_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ultricies adipiscing fringilla. Praesent mattis tincidunt neque, in iaculis ligula tempus non. Integer nec aliquam ipsum. Sed sapien justo, molestie eu dignissim congue, rutrum sed quam. Sed a tortor quis felis consectetur commodo eget id nulla. Nam ultrices aliquam porta. Nullam nec arcu ipsum. Quisque diam felis, mattis et volutpat sit amet, dapibus a velit. In rutrum, nunc et malesuada dictum, purus ante eleifend est, nec ornare metus enim sed nulla. Nulla ac venenatis odio. Curabitur ultrices rutrum accumsan. Nulla a eros ipsum. Sed commodo, turpis at blandit faucibus, lectus turpis condimentum sem, pulvinar volutpat justo nunc ut odio. Sed tincidunt pretium consectetur. Vivamus ut felis velit, id hendrerit nunc. Nulla tempor orci non nulla mattis mattis lobortis arcu pretium. Pellentesque ullamcorper, erat ut dapibus blandit, lorem enim pulvinar tellus, a volutpat felis ipsum in ipsum. Nam euismod sapien in tellus faucibus posuere. Mauris varius pretium aliquam. Phasellus vel diam mi, nec pellentesque risus. Nunc lorem tellus, tempus eu porttitor ut, ullamcorper nec eros. Phasellus a arcu leo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Etiam eu justo quis eros rhoncus vehicula. Nam eget urna urna. Phasellus sagittis lectus nec risus sollicitudin sagittis. Fusce ac erat nec lorem sodales vulputate non in ipsum. Nam lobortis imperdiet erat, a vulputate neque eleifend vel. Praesent at massa quam. Ut suscipit orci id ligula accumsan sit amet aliquam lectus placerat. Cras ac libero arcu. Praesent ante sapien, ultrices non pharetra non, cursus sed nunc. Curabitur quis erat metus, et bibendum neque. Duis euismod sodales cursus. Cras ipsum tellus, viverra vel ullamcorper at, dignissim rhoncus dui. Vivamus auctor lacus a dolor varius in volutpat arcu hendrerit. Nulla non massa quis purus laoreet molestie. Proin nunc elit, dignissim venenatis ornare eget, condimentum non est. Phasellus pharetra accumsan dignissim. Morbi sed ornare libero. Proin semper, nisi eget sagittis facilisis, libero leo imperdiet nisi, at semper felis neque eget nunc. In interdum faucibus dignissim. Aenean tincidunt, erat quis ultrices dapibus, mi tortor venenatis ligula, eu pharetra metus sem a sapien. Quisque porttitor urna eu purus ultrices aliquam. Aenean eu pellentesque justo. Duis nisl turpis, tempor sit amet molestie quis, cursus scelerisque arcu. In eu diam nisi. Praesent nibh tortor, vestibulum eget volutpat et, pretium ut purus. In hac habitasse platea dictumst. Sed arcu magna, aliquam eget pretium vel, porttitor in est. Maecenas semper consequat mattis. Phasellus consectetur accumsan sagittis. Morbi aliquet, est vitae aliquet fermentum, velit erat viverra erat, et feugiat purus dui eu ipsum. Donec vel sodales arcu. Nunc eget erat vel neque suscipit auctor a a sapien. Donec dolor magna, consequat at sagittis a, varius quis ipsum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Proin euismod, eros sit amet tristique rhoncus, quam orci semper erat, eu pellentesque lacus dui quis lorem. Aliquam consequat metus vitae nulla sodales pretium. Nunc nec est ut felis feugiat egestas vitae sed dui. Pellentesque et metus quam, sed pellentesque tortor.";
	
	var Lorem = function (/**Number*/ wordCount) {
		
		var lorem_clean = LOREM_TEXT.replace(/[\.,]/g, '').toLowerCase(),
			lorem_words = lorem_clean.split(' '),
			lorem_trimmed,
			lorem_string;
		
		if (typeof wordCount !== "undefined") {
			lorem_trimmed = lorem_words.splice(0, wordCount);
			lorem_string = lorem_trimmed.join(' ');
		}
		
		if (typeof lorem_string !== "undefined") {
			return lorem_string;
		}
		
	};
	
	Lorem.list = function (limit) {
		
		var _clean = LOREM_TEXT.replace(/[\.,]/g, '').toLowerCase(),
			_words = _clean.split(' '),
			list;
		
		if (typeof limit !== "number") {
			limit = 20;
		}
		
		if (typeof limit !== "undefined") {
			list = _words.splice(0, limit);
			
			return list;
		}
		
	};
	
	FillerText.lorem = Lorem;
	
	this.FillerText = FillerText;
	
	return FillerText;
	
})();