import { Injectable } from '@angular/core';

interface Imodal {
  id : string
  visible : boolean
 }

@Injectable({
  providedIn: 'root'
})


export class ModalService {
  
 private modals: Imodal[] = [];

  constructor() { 
    
  }
  register(id: string) {
    this.modals.push({
      id,
      visible :false
    })
  }


isModalOpen(id :string) : boolean{
  return Boolean(this.modals.find(ele => ele.id === id)?.visible);
  }

toggleModal(id : string){
  const modal = this.modals.find(ele => ele.id === id);
  if (modal) {
  modal.visible = !modal.visible;
  }
}
}