import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import * as crossfilter from 'crossfilter';
import * as dc from 'dc';
import * as d3 from 'd3';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('subjectAGraph')
  subjectAGraph: ElementRef;

  @ViewChild('nameAGraph')
  nameAGraph: ElementRef;

  @ViewChild('markAGraph')
  markAGraph: ElementRef;

  @ViewChild('subjectBGraph')
  subjectBGraph: ElementRef;

  @ViewChild('nameBGraph')
  nameBGraph: ElementRef;

  @ViewChild('markBGraph')
  markBGraph: ElementRef;

  subjectARowChart;
  subjectBRowChart;
  nameAPieChart;
  nameBPieChart;
  markARowChart;
  markBRowChart;

  // dimensions for dataset-a and its mirror
  subjectDimensionA;
  subjectDimensionAMirror;
  nameDimensionA;
  nameDimensionAMirror;
  markDimensionA;
  markDimensionAMirror;
  // dimensions for dataset-b and its mirror
  subjectDimensionB;
  subjectDimensionBMirror;
  nameDimensionB;
  nameDimensionBMirror;
  markDimensionB;
  markDimensionBMirror;
  // groups
  subjectGroupA;
  nameGroupA;
  markGroupA;
  subjectGroupB;
  nameGroupB;
  markGroupB;

  // datasets
  datasetA = [
    {'Subject': 's1', 'Name': 'A', 'Mark': '50'},
    {'Subject': 's2', 'Name': 'B', 'Mark': '40'},
    {'Subject': 's3', 'Name': 'C', 'Mark': '40'}];
  datasetB = [
    {'Subject': 's1', 'Name': 'A', 'Mark': '50'},
    {'Subject': 's2', 'Name': 'B', 'Mark': '40'},
    {'Subject': 'C3', 'Name': 'C', 'Mark': '40'}];


  ngOnInit() {

    // Initialize graphs for dataset-a
    this.subjectARowChart = dc.rowChart(this.subjectAGraph.nativeElement);
    this.nameAPieChart = dc.pieChart(this.nameAGraph.nativeElement);
    this.markARowChart = dc.rowChart(this.markAGraph.nativeElement);
    // Initialize graphs for dataset-b
    this.subjectBRowChart = dc.rowChart(this.subjectBGraph.nativeElement);
    this.nameBPieChart = dc.pieChart(this.nameBGraph.nativeElement);
    this.markBRowChart = dc.rowChart(this.markBGraph.nativeElement);

    // create crossfilter for dataset a and b
    const CFA = crossfilter(this.datasetA);
    const CFB = crossfilter(this.datasetB);

    // create dimension objects for dataset-a
    this.subjectDimensionA = CFA.dimension(function (d) { return d.Subject; });
    this.subjectDimensionAMirror = CFA.dimension(
      function (d) { return d.Subject; });
    this.nameDimensionA = CFA.dimension(function (d) { return d.Name; });
    this.nameDimensionAMirror = CFA.dimension(function (d) { return d.Name; });
    this.markDimensionA = CFA.dimension(function (d) { return d.Mark; });
    this.markDimensionAMirror = CFA.dimension(function (d) { return d.Mark; });

    // create dimension objects for dataset-b
    this.subjectDimensionB = CFB.dimension(function (d) { return d.Subject; });
    this.subjectDimensionBMirror = CFB.dimension(
      function (d) { return d.Subject; });
    this.nameDimensionB = CFB.dimension(function (d) { return d.Name; });
    this.nameDimensionBMirror = CFB.dimension(function (d) { return d.Name; });
    this.markDimensionB = CFB.dimension(function (d) { return d.Mark; });
    this.markDimensionBMirror = CFB.dimension(function (d) { return d.Mark; });

    // create groups for dataset-a
    this.subjectGroupA = this.subjectDimensionA.group();
    this.nameGroupA = this.nameDimensionA.group();
    this.markGroupA = this.markDimensionA.group();
    // create groups for dataset-b
    this.subjectGroupB = this.subjectDimensionB.group();
    this.nameGroupB = this.nameDimensionB.group();
    this.markGroupB = this.markDimensionB.group();

    // create charts for dataset-a
    this.subjectARowChart
      .width(250).height(200)
      .margins({top: 5, left: 10, right: 10, bottom: 20})
      .dimension(this.mirrorDimension(
        this.subjectDimensionA, this.subjectDimensionBMirror))
      .group(this.subjectGroupA)
      .gap(2)
      .title(function (d) { return d.key; })
      .label(function (d) { return d.key; })
      .elasticX(true)
      .colors(d3.scale.category20b())
      .xAxis().ticks(4);

    this.nameAPieChart
      .width(200).height(200)
      .dimension(this.mirrorDimension(
        this.nameDimensionA, this.nameDimensionBMirror))
      .group(this.nameGroupA)
      .colors(d3.scale.category20())
      .innerRadius(25);

    this.markARowChart
      .width(200).height(200)
      .dimension(this.mirrorDimension(
        this.markDimensionA, this.markDimensionBMirror))
      .group(this.markGroupA)
      .gap(2)
      .title(function (d) { return d.key; })
      .label(function (d) { return d.key; })
      .elasticX(true)
      .colors(d3.scale.category20b())
      .xAxis().ticks(4);

    // create charts for dataset-b
    this.subjectBRowChart
      .width(250).height(200)
      .margins({top: 5, left: 10, right: 10, bottom: 20})
      .dimension(
        this.mirrorDimension(
          this.subjectDimensionB, this.subjectDimensionAMirror))
      .group(this.subjectGroupB)
      .gap(2)
      .title(function (d) { return d.key; })
      .label(function (d) { return d.key; })
      .elasticX(true)
      .colors(d3.scale.category20b())
      .xAxis().ticks(4);

    this.nameBPieChart
      .width(200).height(200)
      .dimension(
        this.mirrorDimension(
          this.nameDimensionB, this.nameDimensionAMirror))
      .group(this.nameGroupB)
      .colors(d3.scale.category10())
      .innerRadius(25);

    this.markBRowChart
      .width(200).height(200)
      .dimension(
        this.mirrorDimension(
          this.markDimensionB, this.markDimensionAMirror))
      .group(this.markGroupB)
      .gap(2)
      .title(function (d) { return d.key; })
      .label(function (d) { return d.key; })
      .elasticX(true)
      .colors(d3.scale.category20b())
      .xAxis().ticks(4);

    dc.renderAll();
  }

  mirrorDimension(...args: any[]) {
    const dims = Array.prototype.slice.call(args, 0);
    function mirror(fname) {
      return function(v) {
        dims.forEach(function(dim) {
          dim[fname](v);
        });
      };
    }
    return {
      filter: mirror('filter'),
      filterExact: mirror('filterExact'),
      filterRange: mirror('filterRange'),
      filterFunction: mirror('filterFunction')
    };
  }
}
