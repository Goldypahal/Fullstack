import React, { useState, useMemo } from 'react'

const PLATFORM_DEFS = {
  twitter: { id: 'twitter', name: 'X (Twitter)', charLimit: 280, mediaLimit: 4, supportsMedia: true, maxHashtags: 30 },
  instagram: { id: 'instagram', name: 'Instagram', charLimit: 2200, mediaLimit: 10, supportsMedia: true },
  facebook: { id: 'facebook', name: 'Facebook', charLimit: 63206, mediaLimit: 10, supportsMedia: true },
  linkedin: { id: 'linkedin', name: 'LinkedIn', charLimit: 1300, mediaLimit: 10, supportsMedia: true },
  mastodon: { id: 'mastodon', name: 'Mastodon', charLimit: 500, mediaLimit: 4, supportsMedia: true },
  sms: { id: 'sms', name: 'SMS', charLimit: 160, mediaLimit: 0, supportsMedia: false }
}

function formatRemaining(n) {
  return n >= 0 ? `${n} chars left` : `${-n} over limit`
}

export default function PostComposer() {
  const [content, setContent] = useState('')
  const [selected, setSelected] = useState(['twitter'])
  const [media, setMedia] = useState([])

  const platforms = useMemo(() => selected.map(id => PLATFORM_DEFS[id]), [selected])

  function togglePlatform(id) {
    setSelected(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
  }

  function onFiles(e) {
    const files = Array.from(e.target.files || [])
    setMedia(prev => [...prev, ...files].slice(0, 10))
  }

  function removeMedia(index) {
    setMedia(prev => prev.filter((_, i) => i !== index))
  }

  // Validation
  const validation = useMemo(() => {
    const len = content.length
    const hashtags = (content.match(/#[\w]+/g) || [])
    const perPlatform = platforms.map(p => {
      const remaining = p.charLimit - len
      const errors = []
      const warnings = []
      if (remaining < 0) errors.push(`Exceeds ${p.name} limit by ${-remaining} chars`)
      if (!p.supportsMedia && media.length > 0) errors.push(`${p.name} does not support media attachments`)
      if (p.mediaLimit != null && media.length > p.mediaLimit) warnings.push(`Attached ${media.length} files; ${p.name} supports up to ${p.mediaLimit}`)
      if (p.maxHashtags && hashtags.length > p.maxHashtags) warnings.push(`Too many hashtags for ${p.name} (${hashtags.length} > ${p.maxHashtags})`)
      return { platform: p, remaining, errors, warnings }
    })
    const worstRemaining = perPlatform.length ? Math.min(...perPlatform.map(p => p.remaining)) : PLATFORM_DEFS.twitter.charLimit
    return { perPlatform, worstRemaining, contentLen: len, hashtags }
  }, [content, platforms, media])

  function submit() {
    // For the experiment, just show an alert or console output
    const hasErrors = validation.perPlatform.some(p => p.errors.length)
    if (hasErrors) {
      alert('Cannot publish: fix errors for selected platforms')
      return
    }
    console.log('Publishing to', selected, { content, media })
    alert('Simulated publish — check console for details')
  }

  return (
    <div className="composer">
      <section className="platforms">
        <h2>Publish to</h2>
        <div className="platform-list">
          {Object.values(PLATFORM_DEFS).map(p => (
            <label key={p.id} className="platform">
              <input type="checkbox" checked={selected.includes(p.id)} onChange={() => togglePlatform(p.id)} />
              <span>{p.name}</span>
            </label>
          ))}
        </div>
      </section>

      <section className="editor">
        <textarea
          aria-label="Post content"
          placeholder="Write your post here..."
          value={content}
          onChange={e => setContent(e.target.value)}
        />

        <div className="meta-row">
          <div className="media-input">
            <label className="file-label">
              Attach media
              <input type="file" accept="image/*,video/*" multiple onChange={onFiles} />
            </label>
            <div className="previews">
              {media.map((f, i) => (
                <div className="preview" key={i}>
                  {f.type.startsWith('image') ? (
                    <img src={URL.createObjectURL(f)} alt={f.name} />
                  ) : (
                    <div className="file-box">{f.name}</div>
                  )}
                  <button className="remove" onClick={() => removeMedia(i)}>×</button>
                </div>
              ))}
            </div>
          </div>

          <div className="counters">
            <div className={`remaining ${validation.worstRemaining < 0 ? 'over' : ''}`}>
              {formatRemaining(validation.worstRemaining)}
            </div>
            <div className="hashtags">Hashtags: {validation.hashtags.length}</div>
          </div>
        </div>

        <div className="validation">
          {validation.perPlatform.map(pv => (
            <div key={pv.platform.id} className={`pv ${pv.errors.length ? 'error' : pv.warnings.length ? 'warn' : 'ok'}`}>
              <strong>{pv.platform.name}:</strong>
              <span className="pv-remaining"> {pv.remaining} </span>
              {pv.errors.length > 0 && (
                <ul className="errors">
                  {pv.errors.map((e, i) => <li key={i}>{e}</li>)}
                </ul>
              )}
              {pv.warnings.length > 0 && (
                <ul className="warnings">
                  {pv.warnings.map((w, i) => <li key={i}>{w}</li>)}
                </ul>
              )}
            </div>
          ))}
        </div>

        <div className="actions">
          <button className="publish" onClick={submit}>Publish</button>
          <button className="clear" onClick={() => { setContent(''); setMedia([]) }}>Clear</button>
        </div>
      </section>
    </div>
  )
}
