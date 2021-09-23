function restoreDataOnClient(): any {
  const element = document.getElementById("data");

  if (element && element.textContent) {
    const data = JSON.parse(element.textContent.replace(/&lt;/g, "<"));

    return data;
  }
  return {};
}

export default restoreDataOnClient;
