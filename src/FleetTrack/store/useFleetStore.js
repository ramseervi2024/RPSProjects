import { create } from 'zustand';

const useFleetStore = create((set) => ({
    vehicles: [
        { id: '1', plate: 'GA-01-BK-2024', model: 'Tesla Model 3', status: 'Active', driverId: 'd1', fuelLevel: 85, health: 98, lastLocation: { latitude: 15.4909, longitude: 73.8278 } },
        { id: '2', plate: 'KA-05-MN-9988', model: 'TATA Prima 4028', status: 'Active', driverId: 'd2', fuelLevel: 45, health: 82, lastLocation: { latitude: 12.9716, longitude: 77.5946 } },
        { id: '3', plate: 'MH-12-RT-4567', model: 'Ashok Leyland 3118', status: 'Maintenance', driverId: null, fuelLevel: 10, health: 65, lastLocation: { latitude: 18.5204, longitude: 73.8567 } },
        { id: '4', plate: 'DL-01-SY-1234', model: 'Eicher Pro 6025', status: 'Idle', driverId: 'd3', fuelLevel: 60, health: 90, lastLocation: { latitude: 28.6139, longitude: 77.2090 } },
    ],
    drivers: [
        { id: 'd1', name: 'John Doe', status: 'On Duty', phone: '+91 9876543210', experience: '5 Yrs' },
        { id: 'd2', name: 'Alok Singh', status: 'On Duty', phone: '+91 8888877777', experience: '8 Yrs' },
        { id: 'd3', name: 'Rahul Kumar', status: 'Available', phone: '+91 7777766666', experience: '3 Yrs' },
    ],
    trips: [
        { id: 't1', target: 'Warehouse A → Terminal 2', driver: 'John Doe', time: '5m ago', status: 'Moving' },
        { id: 't2', target: 'Main Hub → Depot 4', driver: 'Alok Singh', time: '12m ago', status: 'Moving' },
        { id: 't3', target: 'City Port → Central', driver: 'Rahul Kumar', time: '45m ago', status: 'Idle' },
    ],
    logs: [],

    addVehicle: (vehicle) => set((state) => ({
        vehicles: [{ ...vehicle, id: Math.random().toString(36).substr(2, 9) }, ...state.vehicles]
    })),

    addDriver: (driver) => set((state) => ({
        drivers: [{ ...driver, id: 'd' + Math.random().toString(36).substr(2, 5) }, ...state.drivers]
    })),

    addTrip: (trip) => set((state) => ({
        trips: [{ ...trip, id: 't' + Math.random().toString(36).substr(2, 5), time: 'Just now' }, ...state.trips]
    })),

    updateVehicleStatus: (id, status) => set((state) => ({
        vehicles: state.vehicles.map((v) => v.id === id ? { ...v, status } : v)
    })),

    addLog: (log) => set((state) => ({ logs: [log, ...state.logs] })),
}));

export default useFleetStore;
