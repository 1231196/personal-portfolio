function TerminalWindow({ title, children, bodyRef, onBodyClick, footer, bodyClassName }) {
  return (
    <div className="term-window">
      <div className="term-titlebar">
        <div className="term-dots">
          <span className="dot dot-red" />
          <span className="dot" />
          <span className="dot" />
        </div>
        <p className="term-title">{title}</p>
        <div className="term-titlebar-spacer" aria-hidden="true" />
      </div>
      <div className={`term-body${bodyClassName ? ` ${bodyClassName}` : ''}`} ref={bodyRef} onClick={onBodyClick}>
        {children}
      </div>
      {footer}
    </div>
  )
}

export default TerminalWindow
