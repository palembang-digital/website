import React from "react";
import s from "./Join.module.scss";

class Join extends React.Component {
  render() {
    return (
      <div id={s["join"]} className="warna">
        <div className={s["container-join"]}>
          <div className={s["box"]}>
            <div className={s["join"]}>
              <h1>Siap gabung ke Patal?</h1>
              <p>
                Klik tombol daftar sekarang untuk mendaftarkan diri anda
                terlebih dahulu!
              </p>
              <div className={s["boxfit"]}>
                <a
                  href="https://bit.ly/web-join-patal"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button>Daftar Sekarang</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Join;
