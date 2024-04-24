import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { loadModules } from 'esri-loader';
import Sketch from "@arcgis/core/widgets/Sketch"
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import esriConfig from "@arcgis/core/config";


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

    // Set API key globally
    esriConfig.apiKey = "AAPK80eece7838f54bb5bbfb1c81cebd3bd38QqcXDUY01jWLO-uzivGOBE9hARZ_91Hjn_5qyYIbd18RzAey-0FBj4lc3pX5S2i";

    loadModules(['esri/Map', 'esri/views/MapView', 'esri/layers/FeatureLayer']).then(([Map, MapView, FeatureLayer]) => {
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
        portalItem: {
          id: "ef7e45b8cd0a40d29da0718d37b0552e"
        },
        url: "https://services6.arcgis.com/WKdqRUJNY2BJpnFr/arcgis/rest/services/power_house_view/FeatureServer/0"
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
