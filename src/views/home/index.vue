<template>
  <main class="home-page">
    <el-card>
      <h1>Mesas</h1>

      <div class="grid">
        <div class="col-4">2</div>
      </div>

      <div class="grid">
        <div class="col">1</div>
        <div class="col">2</div>
        <div class="col">3</div>
      </div>

      <Card style="width: 20em">
        <template #title> Mesa #1 </template>
        <template #subtitle> Pedido por: Fernando </template>
        <!-- <template #content>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore
            sed consequuntur error repudiandae numquam deserunt quisquam
            repellat libero asperiores earum nam nobis, culpa ratione quam
            perferendis esse, cupiditate neque quas!
          </p>
        </template> -->
        <template #footer>
          <Button
            icon="pi pi-eye"
            label="Detalles"
            @click="$refs.modalDetalles.abrir(slotProps.data.id)"
          />
        </template>
      </Card>
    </el-card>
  </main>

  <modal-detalles
    ref="modalDetalles"
    @actualizarTabla="obtenerTodos"
  ></modal-detalles>
</template>

<script>
import ModalDetalles from "./modales/detalles.vue";

export default {
  components: {
    ModalDetalles,
  },

  data() {
    return {};
  },
};
</script>

<style>
el-card {
  margin: 0px;
  padding: 0px;
}

.botonHome:hover {
  transform: translateY(-2px);
  box-shadow: 0px 2px 5px #0000002a !important;
  cursor: pointer;
  background-color: #cccccc;
}

.iconoTarjeta {
  font-size: 16vh;
  margin-top: 20px;
  color: var(--dark-alt);
}
</style>