// Simple mock API that persists drafts to localStorage and returns Promises
const KEY = 'exp-1-1-2-drafts'

function readStore(){
  try{
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  }catch(e){
    return []
  }
}

function writeStore(list){
  localStorage.setItem(KEY, JSON.stringify(list))
}

function delay(ms){
  return new Promise(res => setTimeout(res, ms))
}

export async function getDrafts(){
  await delay(200 + Math.random()*300)
  return readStore()
}

export async function saveDraft(draft){
  await delay(200 + Math.random()*400)
  const list = readStore()
  const existingIndex = list.findIndex(d => d.id === draft.id)
  if(existingIndex >= 0){
    draft.updatedAt = Date.now()
    list[existingIndex] = draft
  }else{
    draft.createdAt = Date.now()
    draft.updatedAt = Date.now()
    list.unshift(draft)
  }
  writeStore(list)
  return draft
}

export async function deleteDraft(id){
  await delay(120 + Math.random()*200)
  const list = readStore().filter(d => d.id !== id)
  writeStore(list)
  return true
}

export async function getDraft(id){
  await delay(120 + Math.random()*200)
  const list = readStore()
  return list.find(d => d.id === id) || null
}
