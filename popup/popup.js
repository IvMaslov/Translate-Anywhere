var DEFAULT_SOURCE_LANGUAGE = "en",
    DEFAULT_TARGET_LANGUAGE = "ru";
const SAVE_BUTTON = document.querySelector("#save-btn")


function load_languages(e) {
	browser.storage.local.set({
			source_language: document.querySelector("#source-lang").value,
			target_language: document.querySelector("#target-lang").value
		})

	e.preventDefault()
}

function reload_options(e) {
	let storage_elem = browser.storage.local.get();

	storage_elem.then(result => {
		let source_language = result.source_language,
		target_language = result.target_language;

		document.querySelector("#source-lang").value = source_language || DEFAULT_SOURCE_LANGUAGE;
		document.querySelector("#target-lang").value = target_language || DEFAULT_TARGET_LANGUAGE;
	});
}


SAVE_BUTTON.addEventListener("click", load_languages);
document.addEventListener('DOMContentLoaded', reload_options);