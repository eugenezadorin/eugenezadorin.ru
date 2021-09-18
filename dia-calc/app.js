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

		let productWeight = parseFloat(productWeightField.value).toFixed(2);

		let carboCountMeasure = parseFloat(carboCountField.value).toFixed(2);

		let realCarboCount = (productWeight * carboCountMeasure) / 100;
		realCarboCount = realCarboCount.toFixed(2);

		let breadItemsCount = (realCarboCount / 12).toFixed(2);

		renderResult(productWeight, breadItemsCount);
	});

	function renderResult(productWeight, breadItems) {
		resultBlock.innerHTML = `В ${productWeight} продукта ${breadItems} хлебных единиц`;
		resultBlock.classList.add('success');
		resultBlock.classList.remove('error');
	}

	function renderError(message) {
		resultBlock.innerHTML = message;
		resultBlock.classList.remove('success');
		resultBlock.classList.add('error');
	}

})();