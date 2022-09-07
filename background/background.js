
function parse_data(site_text) {
	try {
		let doc = new DOMParser().parseFromString(site_text, "text/html");
		let WRD = doc.querySelector(".WRD");
		let tbody = WRD.children[0];
		let tbody_children = tbody.children;
		let translated_text = [];

		for (let i = 0;i < tbody_children.length; i++) {
			if (tbody_children[i].id) {
				let td = tbody_children[i].children;
				for (let j = 0;j < td.length;j++)
				{
					if (td[j].className == "ToWrd")
						translated_text.push(td[j].firstChild.data)

				}
			}
		}
		return translated_text;
	}
	catch(err) {
		return "";
	}
}

function get_send_text(translated_array) {
	let text_on_send = "";

	if (translated_array[0] == translated_array[1])
		text_on_send += translated_array[0];
	else
	{
		if (translated_array.length > 2)
			text_on_send += translated_array[0] + "\n" + translated_array[1];
		else
	   		for (let i = 0; i < translated_array.length; i++)
	    		text_on_send = text_on_send + translated_array[i];
    }
    return text_on_send;

}

function listener(message, sender, sendResponse) {
	let word = message.word,
    	source = message.source,
    	target = message.target;

    /*let site_text = translate(word, source, target);*/
    const url = "https://www.wordreference.com/" + source + target + "/" + word;

	fetch(url, {
		method: "GET",
	})
	.then(response => response.text())
	.then(text => {
		let translated_array = parse_data(text);
		if (!translated_array) 
		{
			sendResponse();
			return true;
		}

		let text_on_send = get_send_text(translated_array);

    	sendResponse({text: word,
    				 translated_text: text_on_send});
	});


	return true;
}

function handler(message, sender, sendResponse)
{
	let word = message.word,
    	source = message.source,
    	target = message.target;

    console.log(word, source, target);
    const url = "https://www.wordreference.com/" + source + target + "/" + word;
	console.log(url);


	sendResponse({text:word, translated_text:"слово"});
}

browser.runtime.onMessage.addListener(listener);
