(function() {

	const productWeightField = document.getElementById('product-weight');
	const carboCountField = document.getElementById('carbo-count');
	const processButton = document.getElementById('process');
	const resultBlock = document.getElementById('result');
	const summaryTable = document.getElementById('summary-table');

	let summaryTableItems = [];

	processButton.addEventListener('click', function() {

		if (!productWeightField.value || !carboCountField.value) {
			renderError('Пожалуйста, заполните все поля');
			return;
		}

		let productWeight = getFloatValue(productWeightField);

		let carboCountMeasure = getFloatValue(carboCountField);

		let realCarboCount = (productWeight * carboCountMeasure) / 100;

		let breadItemsCount = (realCarboCount / 12);

		renderResult(productWeight, realCarboCount, breadItemsCount);
	});

	function renderResult(productWeight, realCarboCount, breadItems) {
		let message = `
			В <strong>${productWeight.toFixed(2)}</strong> г. продукта: <br><br>
			<strong>${realCarboCount.toFixed(2)}</strong> г. углеводов<br>
			<strong>${breadItems.toFixed(2)}</strong> хлебных единиц <br><br>
			<button class="button is-success is-light" id="add-new-item">Добавить еще</button>
		`;

		resultBlock.innerHTML = `<div class="notification is-success">${message}</div>`;

		summaryTableItems.push({
			weight: productWeight,
			carbo: realCarboCount,
			bread: breadItems
		});
		renderSummaryTable();

		resultBlock.querySelector('#add-new-item').addEventListener('click', () => {
			resultBlock.innerHTML = '';
			carboCountField.value = '';
			productWeightField.value = '';
			productWeightField.focus();
		});
	}

	function renderError(message) {
		resultBlock.innerHTML = `<div class="notification is-danger">${message}</div>`;
	}

	function getFloatValue(node) {
		let strVal = node.value || '';
		strVal = strVal.trim().replace(',', '.');
		return parseFloat(strVal);
	}

	function renderSummaryTable() {
		if (summaryTableItems.length === 0) {
			summaryTable.innerHTML = '';
			return;
		}

		const heading = `
			<thead>
				<tr>
					<th colspan="2">Продукт</th>
					<th>Углеводы</th>
					<th>ХЕ</th>
				</tr>
			</thead>
		`;

		let rows = '';
		let count = 1;
		let totalCarbo = 0.0;
		let totalBread = 0.0;

		summaryTableItems.map(item => {
			rows += `
				<tr>
					<td>#${count}</td>
					<td>${item.weight.toFixed(2)} г.</td>
					<td>${item.carbo.toFixed(2)} г.</td>
					<td>${item.bread.toFixed(2)} ХЕ</td>
				</tr>
			`;
			totalCarbo += item.carbo;
			totalBread += item.bread;
			count++;
		});


		const body = `<tbody>${rows}</tbody>`;

		const footer = `
			<tfoot>
				<tr>
					<th colspan="2">Итого</th>
					<th>${totalCarbo.toFixed(2)} г.</th>
					<th>${totalBread.toFixed(2)} ХЕ</th>
				</tr>
			</tfoot>
		`;

		summaryTable.innerHTML = `
			<table class="table is-fullwidth">
				${heading}
				${body}
				${footer}
			</table>
			<button id="reset-summary-table" class="button is-danger is-light">Сбросить</button>
		`;

		summaryTable.querySelector('#reset-summary-table').addEventListener('click', () => {
			summaryTableItems = [];
			renderSummaryTable();
			resultBlock.innerHTML = '';
			carboCountField.value = '';
			productWeightField.value = '';
			productWeightField.focus();
		});
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