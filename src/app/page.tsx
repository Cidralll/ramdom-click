'use client';
import { useState } from 'react';
import styles from './page.module.scss'

export default function Home() {
  const [list, setList] = useState<{ clientX: any; clientY: any; }[]>([]);
  const [undid, setUndid] = useState<{ clientX: any; clientY: any; }[]>([]);

  const ramdomClick = (event: any) => {

    const newDot = {
      clientX: event.clientX,
      clientY: event.clientY,
    }
    
    setList((prev) => [...prev, newDot]); // Cria novo array e copia os elementos que ja estavam antes
    setUndid([]);                         // Limpa os elementos do refazer sempre que é criado um novo elemento
  }  
  
  const handleUndo = (event: any) => {
    event.stopPropagation();              // Evita que ao clicar no botao apareça pontos sobre ele

    if (list.length === 0) {
      return;
    }

    const lastItem = list[list.length - 1];
    setUndid((prev) => [...prev, lastItem]);

    setList((prev) => {
      const newArry = [...prev].slice(0,-1);
      return newArry;
    });
  }

  const handleRedo = (event: any) => {
    event.stopPropagation();              // Evita que ao clicar no botao apareça pontos sobre ele

    if (undid.length === 0) {
      return;
    }

    const recoverDot = undid[undid.length - 1];
    setUndid((prev) => {
      const newArry = [...prev].slice(0,-1);
      return newArry;
    });
    setList((prev) => [...prev, recoverDot]);
  }

  return (
    <main className={styles.main} onClick={(event) => ramdomClick(event)}>
      <button onClick={(event) => handleUndo(event)}>Desfazer</button>
      <button onClick={(event) => handleRedo(event)}>Refazer</button>
      {list.map((item, index) => (
        <span style={{top: item.clientY, left: item.clientX}} className={styles.dot} key={index} />
      ))}
    </main>
  )
}
