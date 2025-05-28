

import 'vue-simple-context-menu/dist/vue-simple-context-menu.css'
import * as menu from 'vue-simple-context-menu'
export default function VueSimpleContextMenu(app) {
    app.component('VueSimpleContextMenu', menu)
    app.use(menu)

}
