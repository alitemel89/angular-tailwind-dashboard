import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @ViewChild('mapViewNode', { static: true }) private mapViewEl!: ElementRef | undefined;

  constructor() { }

  ngOnInit(): void {
    if (!this.mapViewEl) {
      console.error('Map view element not found.');
      return;
    }

    const graphicsLayer = new GraphicsLayer();

    loadModules(['esri/Map', 'esri/views/MapView', 'esri/widgets/Sketch', 'esri/layers/FeatureLayer']).then(([Map, MapView, Sketch, FeatureLayer]) => {
      const map = new Map({
        basemap: 'topo-vector'
      });

      const view = new MapView({
        container: this.mapViewEl!.nativeElement,
        map: map,
        center: [10.4515, 51.1657],
        zoom: 6
      });

      const layer = new FeatureLayer({
        url: "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/USA_Counties/FeatureServer/0"
      });

      view.when(() => {
        const sketch = new Sketch({
          layer: graphicsLayer,
          view: view
        });
        view.ui.add(sketch, "top-right");

        // Add layer to map
        view.map.add(layer);
      });
    });
  }
}
