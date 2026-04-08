function getTasteWord(count) {
    if (count % 10 === 1 && count % 100 !== 11) {
        return 'вкус';
    } else if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
        return 'вкуса';
    } else {
        return 'вкусов';
    }
}


function getCartKey(serviceId, weight) {
    return `${serviceId}_${weight}`;
}


function escapeHtml(text) {
    return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
}
