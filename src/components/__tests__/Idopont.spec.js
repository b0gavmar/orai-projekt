import { describe, it, expect, beforeEach } from "vitest";

import { mount } from "@vue/test-utils";
import Foglalas from "../../views/IdopontFoglalasView.vue";
import { useIdopontStore } from "@/stores/idopont";
import { createPinia, setActivePinia } from "pinia";

describe("IdopontFoglalas", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("Tartalom ellenőrzés", () => {
    const wrapper = mount(Foglalas);
    expect(wrapper.text()).toContain("Foglaló neve:");
  });

  it("Időpontok ellenőrzése", async () => {
    const idopontStore = useIdopontStore();

    idopontStore.idopontok = [
      { id: 2008, day: "Kedd", hour: 8, reserved: false },
      { id: 2009, day: "Kedd", hour: 9, reserved: true },
      { id: 2010, day: "Kedd", hour: 10, reserved: false },
    ];

    const wrapper = mount(Foglalas);

    await wrapper.vm.$nextTick();

    const options = wrapper.findAll("option");

    const containsReserved = () => {
      options.forEach((opt) => {
        if (opt.id == 2009) {
          return true;
        }
      });
      return false;
    };

    expect(containsReserved()).toBe(false);
  });

  it("Foglalás kezdése", () => {
    const idopontStore = useIdopontStore();
    idopontStore.setFoglalniKivantIdopont({
      id: 1111,
      day: "Kedd",
      hour: 14,
      name: "",
      mobile: "",
      reserved: false,
    });
    expect(idopontStore.foglalniKivantIdopont).toStrictEqual({
      id: 1111,
      day: "Kedd",
      hour: 14,
      name: "",
      mobile: "",
      reserved: false,
    });
  });
});
