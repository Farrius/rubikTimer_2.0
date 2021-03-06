export default class ListaTimes {
  constructor(state) {
    this.lista = [];
    this.state = state;
  }
  //formateo
  formatearSegundosMinutos(tiempo) {
    if (tiempo >= 60) {
      let tiempos = this.comprovarRedondeoDecimas(
        `${Math.floor(tiempo / 60)}:${Math.round((tiempo % 60) * 100) / 100}`
      );
      if (tiempos.includes(":")) {
        if (
          tiempos
            .split(":")[1]
            .split("")
            .slice(tiempos.indexOf(":") + 1, tiempos.indexOf(".")).length !== 2
        ) {
          tiempos =
            tiempos.slice(0, tiempos.indexOf(":") + 1) +
            "0" +
            tiempos.slice(tiempos.indexOf(":") + 1, tiempos.split("").length);
        }
      }
      return tiempos;
    } else {
      let tiempos = this.comprovarRedondeoDecimas(
        `${Math.round(tiempo * 100) / 100}`
      );
      return tiempos;
    }
  }
  comprovarRedondeoDecimas(tiempos) {
    if (tiempos.includes(".")) {
      if (tiempos.split(".")[1].split("").length !== 2) tiempos += "0";
      if (tiempos.split(".")[0].split("").length !== 2) tiempos = "0" + tiempos;
    } else {
      tiempos += ".00";
    }
    return tiempos;
  }
  //state methods
  subirAlState(tiempo) {
    if (tiempo.includes(":")) {
      const arrayNum = tiempo.split(":");
      const tiempoSec = parseInt(arrayNum[0] * 60) + parseFloat(arrayNum[1]);
      this.lista.unshift(tiempoSec);
      this.ponerLocalStorage();
    } else {
      this.lista.unshift(parseFloat(tiempo));
      this.ponerLocalStorage();
    }
  }
  quitarDelState(indexElement) {
    this.lista.splice(indexElement, 1);
    this.ponerLocalStorage();
  }
  //calculo de medias
  hacerMediaArray(arrayMedias) {
    const sumaArrayMedias = arrayMedias.reduce(
      (accumulator, cur) => accumulator + cur,
      0
    );
    const mediaArray = this.formatearSegundosMinutos(
      sumaArrayMedias / arrayMedias.length
    );
    return mediaArray;
  }
  mediaA05(tiempos) {
    if (tiempos.length >= 5) {
      const ultimos5 = tiempos.slice(0, 5);
      const masBajo = Math.min(...ultimos5);
      const masAlto = Math.max(...ultimos5);
      const indexAlto = ultimos5.indexOf(masAlto);
      ultimos5.splice(indexAlto, 1);
      const indexBajo = ultimos5.indexOf(masBajo);
      ultimos5.splice(indexBajo, 1);
      const mediaAo5 = this.hacerMediaArray(ultimos5);
      return mediaAo5;
    } else if (tiempos.length > 0) {
      return this.hacerMediaArray(tiempos);
    }
  }
  mediaAll(tiempos) {
    return this.hacerMediaArray(tiempos);
  }
  //resetLista
  resetLista() {
    this.lista = [];
  }
  //localStorage
  ponerLocalStorage() {
    localStorage.setItem("tiempos", JSON.stringify(this.lista));
  }
  cogerLocalStorage() {
    const storage = JSON.parse(localStorage.getItem("tiempos"));
    if (storage) this.lista = storage.reverse();
    this.state.localStorage = true;
  }
  resetLocalStorage() {
    localStorage.clear();
  }
}
