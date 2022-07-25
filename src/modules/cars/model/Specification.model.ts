import { v4 as uuidV4 } from 'uuid'

class Specification {
  id?: string
  name: string
  description: string
  created_at: Date

  /* Método constructor é um método especial executado no momento em que a classe é instanciada, 
      além disso os atributos da classe são definidos dentro deste método.
      O construtor foi utilizado para fazer a verificação que se não houver um id que ele seja criado.
      Vai ajudar a não criar ids quando chamar o método put para fazer updates.
   */
  constructor() {
    if (!this.id) {
      this.id = uuidV4()
    }
  }
}
export { Specification }

