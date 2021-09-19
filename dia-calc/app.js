(function() {

	const productWeightField = document.getElementById('product-weight');
	const carboCountField = document.getElementById('carbo-count');
	const processButton = document.getElementById('process');
	const resultBlock = document.getElementById('result');

	processButton.addEventListener('click', function() {

		if (!productWeightField.value || !carboCountField.value) {
			renderError('Пожалуйста, заполните все поля');
			return;
		}

		let productWeight = getFloatValue(productWeightField);

		let carboCountMeasure = getFloatValue(carboCountField);

		let realCarboCount = (productWeight * carboCountMeasure) / 100;
		realCarboCount = realCarboCount.toFixed(2);

		let breadItemsCount = (realCarboCount / 12).toFixed(2);

		renderResult(productWeight, realCarboCount, breadItemsCount);
	});

	function renderResult(productWeight, realCarboCount, breadItems) {
		let message = `
			В <strong>${productWeight}</strong> г. продукта: <br><br>
			<strong>${realCarboCount}</strong> г. углеводов<br>
			<strong>${breadItems}</strong> хлебных единиц
		`;
		resultBlock.innerHTML = `<div class="notification is-success">${message}</div>`;
	}

	function renderError(message) {
		resultBlock.innerHTML = `<div class="notification is-danger">${message}</div>`;
	}

	function getFloatValue(node) {
		let strVal = node.value || '';
		strVal = strVal.trim().replace(',', '.');
		return parseFloat(strVal).toFixed(2);
	}

	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('./worker.js')
			.then((reg) => {
				// success
			}).catch((error) => {
				// error
			});
    }

})();