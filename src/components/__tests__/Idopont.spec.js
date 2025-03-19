import { describe, it, expect, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import Foglalas from "../../views/IdopontFoglalasView.vue";
import { useIdopontStore } from "@/stores/idopont";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createMemoryHistory } from "vue-router";

const router = createRouter({
  history: createMemoryHistory(),
  routes: [{ path: "/foglalas/:idopontid", component: Foglalas }],
});

describe("IdopontFoglalas", () => {
  beforeEach(async () => {
    setActivePinia(createPinia());
    router.push("/foglalas/2008");
    await router.isReady();
  });

  it("Időpont generálás ellenőrzés", () => {
    const wrapper = mount(Foglalas, {
      global: {
        plugins: [router],
        mocks: {
          $route: {
            params: {
              idopontid: "2008",
            },
          },
        },
      },
    });
    expect(wrapper.text()).toContain("Foglaló neve:");
  });

  it("Időpontok ellenőrzése", async () => {
    const idopontStore = useIdopontStore();

    idopontStore.idopontok = [
      { id: "2008", day: "Kedd", hour: 8, reserved: false },
      { id: "2009", day: "Kedd", hour: 9, reserved: true },
      { id: "2010", day: "Kedd", hour: 10, reserved: false },
    ];

    const wrapper = mount(Foglalas, {
      global: {
        plugins: [router],
        mocks: {
          $route: {
            params: {
              idopontid: "2008",
            },
          },
        },
      },
    });

    await wrapper.vm.$nextTick();

    const options = wrapper.findAll("option");

    const containsReserved = options.some(
      (opt) => opt.element.value === "2009"
    );
    expect(containsReserved).toBe(false);
  });

  it("Foglalás törlése", async () => {
    const idopontStore = useIdopontStore();
    await idopontStore.postIdopont({
      id: "1111",
      day: "Kedd",
      hour: 14,
      name: "",
      mobile: "",
      reserved: false,
    });

    await idopontStore.removeUnreserved();

    expect(idopontStore.idopontok).not.toContain({
      id: "1111",
      day: "Kedd",
      hour: 14,
      name: "",
      mobile: "",
      reserved: false,
    });
  });
});
