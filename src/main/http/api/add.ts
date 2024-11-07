/**
 * toggle
 * @author: oldj
 * @homepage: https://oldj.net
 */

import { getList, setHostsContent, setList } from '@main/actions'
import { broadcast } from '@main/core/agent'
import events from '@common/events'
import md5 from 'md5'
import { findItemById } from '@common/hostsFn'
import { Request, Response } from 'express'

const add = async (req: Request, res: Response) => {
  console.log(req.body, req.query, req.params, req.path, req.originalUrl)
  let { id, title, content } = req.body
  id ||= md5(title);
  console.log(`http_api add: ${id}, ${title}, ${content}`)
  if (!id) {
    res.end('bad id.')
    return
  }

  let list = await getList()
  await setHostsContent(`${id}`, `${content}`)
  if (!findItemById(list, `${id}`)) {
    console.log('append\n')
    list.push({
      id: `${id}`,
      title: `${title}`,
      type: 'local'
    })
    await setList(list)
  }

  if (!id) {
    res.end('bad id.')
    return
  }

  broadcast(events.reload_list)
  res.end('ok')
}

export default add
