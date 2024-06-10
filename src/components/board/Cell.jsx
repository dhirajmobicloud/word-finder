function Cell({ letter, status, anim }) {
  return <div className={`board__cell ${status} ${anim}`}>{letter}</div>
}

export default Cell
